package dialects

import (
	"database/sql"
	"encoding/json"
)

// NullString sql.NullStringにjsonとの相互変換ロジックを組み込んだ型
type NullString struct {
	sql.NullString
}

// UnmarshalJSON json形式の入力でnullか保持する値かのみ渡すようにする
func (n *NullString) UnmarshalJSON(value []byte) error {
	if string(value) == "null" {
		n.String, n.Valid = "", false
		return nil
	}
	err := json.Unmarshal(value, &n.String)
	n.Valid = err == nil
	return err
}

// MarshalJSON json形式の出力でnullか保持する値かのみ返すようにする
func (n NullString) MarshalJSON() ([]byte, error) {
	if !n.Valid {
		return json.Marshal(nil)
	}
	return json.Marshal(n.String) // 値のフィールドのみ返す
}

//ToDialectNullString 変換
func ToDialectNullString(val string) NullString {
	return NullString{NullString: sql.NullString{String: val, Valid: true}}
}
