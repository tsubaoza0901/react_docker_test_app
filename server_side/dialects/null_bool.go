package dialects

import (
	"database/sql"
	"encoding/json"
)

// NullBool sql.NullBoolにjsonとの相互変換ロジックを組み込んだ型
type NullBool struct {
	sql.NullBool
}

// UnmarshalJSON json形式の入力でnullか保持する値かのみ渡すようにする
func (n *NullBool) UnmarshalJSON(value []byte) error {
	if string(value) == "null" {
		n.Bool, n.Valid = false, false
		return nil
	}
	err := json.Unmarshal(value, &n.Bool)
	n.Valid = err == nil
	return err
}

// MarshalJSON json形式の出力でnullか保持する値かのみ返すようにする
func (n NullBool) MarshalJSON() ([]byte, error) {
	if !n.Valid {
		return json.Marshal(nil)
	}
	return json.Marshal(n.Bool) // 値のフィールドのみ返す
}

//ToDialectNullBool 変換
func ToDialectNullBool(val bool) NullBool {
	return NullBool{NullBool: sql.NullBool{Bool: val, Valid: true}}
}
