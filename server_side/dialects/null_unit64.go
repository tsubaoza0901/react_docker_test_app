package dialects

import (
	"database/sql/driver"
	"encoding/json"
	"fmt"
	"reflect"
	"strconv"
)

// NullUint64 represents an uint64 that may be null.
// NullUint64 implements the Scanner interface so
// it can be used as a scan destination, similar to NullString.
type NullUint64 struct {
	Uint64 uint64
	Valid  bool // Valid is true if Uint64 is not NULL
}

// Scan implements the Scanner interface.
func (n *NullUint64) Scan(value interface{}) error {
	if value == nil {
		n.Uint64, n.Valid = 0, false
		return nil
	}
	n.Valid = true

	// 入力をNullUint64.Uint64に格納する処理
	// json周りの変換を下で定義しているのでここまで厳密にやらなくても良いかも

	// 入力をstring型とおく
	var s string
	switch v := value.(type) {
	case string:
		s = v
	case []byte:
		s = string(v)
	default:
		rv := reflect.ValueOf(value)
		switch rv.Kind() {
		case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64:
			s = strconv.FormatInt(rv.Int(), 10)
		case reflect.Uint, reflect.Uint8, reflect.Uint16, reflect.Uint32, reflect.Uint64:
			s = strconv.FormatUint(rv.Uint(), 10)
		case reflect.Float64:
			s = strconv.FormatFloat(rv.Float(), 'g', -1, 64)
		case reflect.Float32:
			s = strconv.FormatFloat(rv.Float(), 'g', -1, 32)
		case reflect.Bool:
			s = strconv.FormatBool(rv.Bool())
		}
		s = fmt.Sprintf("%v", value)
	}
	// string型とおいた入力をuint64型に変換する
	u64, err := strconv.ParseUint(s, 10, 64)
	if err != nil {
		if ne, ok := err.(*strconv.NumError); ok {
			err = ne.Err
		}
		return fmt.Errorf("converting driver.Value type %T (%q) to a %s: %v", value, s, reflect.Uint64, err)
	}
	n.Uint64 = u64
	return nil
}

// Value implements the driver Valuer interface.
func (n NullUint64) Value() (driver.Value, error) {
	if !n.Valid {
		return nil, nil
	}
	return n.Uint64, nil
}

// UnmarshalJSON ...
// json形式の入力でnullか保持する値かのみ渡すようにする
func (n *NullUint64) UnmarshalJSON(value []byte) error {
	err := json.Unmarshal(value, &n.Uint64)
	n.Valid = err == nil
	return err
}

//MarshalJSON ...
// json形式の出力でnullか保持する値かのみ返すようにする
func (n NullUint64) MarshalJSON() ([]byte, error) {
	if !n.Valid {
		return json.Marshal(nil)
	}
	return json.Marshal(n.Uint64) // 値のフィールドのみ返す
}
