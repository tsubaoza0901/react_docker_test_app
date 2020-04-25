package dialects

import (
	"database/sql"
	"encoding/json"
)

// NullInt64 sql.NullInt64にjsonとの相互変換ロジックを組み込んだ型
type NullInt64 struct {
	sql.NullInt64
}

// UnmarshalJSON json形式の入力でnullか保持する値かのみ渡すようにする
func (n *NullInt64) UnmarshalJSON(value []byte) error {
	if string(value) == "null" {
		n.Int64, n.Valid = 0, false
		return nil
	}
	err := json.Unmarshal(value, &n.Int64)
	n.Valid = err == nil
	return err
}

// MarshalJSON json形式の出力でnullか保持する値かのみ返すようにする
func (n NullInt64) MarshalJSON() ([]byte, error) {
	if !n.Valid {
		return json.Marshal(nil)
	}
	return json.Marshal(n.Int64) // 値のフィールドのみ返す
}

//ToDialectNullInt64 変換
func ToDialectNullInt64(val int64) NullInt64 {
	return NullInt64{NullInt64: sql.NullInt64{Int64: val, Valid: true}}
}

//DialectNullInt64Null Nullの場合
var DialectNullInt64Null = NullInt64{NullInt64: sql.NullInt64{Int64: 0, Valid: false}}
