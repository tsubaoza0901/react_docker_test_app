package dialects

// import (
//  "database/sql"
//  "encoding/json"
//  "time"
// )

// // NullDatetime NullTimeにjsonとの相互変換ロジックを組み込んだ型
// type NullDatetime struct {
//  sql.NullTime
// }

// // UnmarshalJSON json形式の入力でnullか保持する値かのみ渡すようにする
// func (n *NullDatetime) UnmarshalJSON(value []byte) error {
//  if string(value) == "null" {
//      n.Time, n.Valid = time.Time{}, false
//      return nil
//  }
//  err := json.Unmarshal(value, &n.Time)
//  n.Valid = err == nil
//  return err
// }

// // MarshalJSON json形式の出力でnullか保持する値かのみ返すようにする
// func (n NullDatetime) MarshalJSON() ([]byte, error) {
//  if !n.Valid {
//      return json.Marshal(nil)
//  }
//  return json.Marshal(n.Time) // 値のフィールドのみ返す
// }

// //AddDate 日付を足し算する
// func AddDate(nt NullDatetime, year int, month int, days int) (nt2 NullDatetime) {
//  if nt.Valid == true && !nt.Time.IsZero() {
//      nt2.Time = nt.Time.AddDate(year, month, days)
//      nt2.Valid = true
//  } else {
//      nt2.Valid = false
//  }
//  return nt2
// }

// //DialectNullDateTimeNull Nullの場合
// var DialectNullDateTimeNull = NullDatetime{NullTime: sql.NullTime{Time: time.Time{}, Valid: false}}
