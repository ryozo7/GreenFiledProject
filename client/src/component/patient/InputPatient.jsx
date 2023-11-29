import React from 'react'
import { useNavigate } from 'react-router-dom'

const InputPatient = () => {

  const navigate = useNavigate()
  const postClickHandler = () => {
    console.log("post処理実行後、PatientTopへ移動")
    //新規登録用のApiをたたきに行く
    navigate("/patient/histories")
  }

  const cancelClickHandler = () => {
    ///patient/historiesへ戻る
    navigate("/patient/histories")
  }

  return (
    <div>
      <div>
        <label htmlFor="">日付 : </label>
        <input type="date" />
      </div>
      <div>
        <label htmlFor="">時間帯 : </label>
        <input type="checkbox" value="0" />
        <label htmlFor="">朝</label>
        <input type="checkbox" value="1" />
        <label htmlFor="">昼</label>
        <input type="checkbox" value="2" />
        <label htmlFor="">晩</label>
      </div>
      <div>
        <label htmlFor="">体温: </label>
        <select name="" id="">
          <option value="">36.5</option>
          <option value="">37.0</option>
          <option value="">37.5</option>
        </select>
      </div>
      <div>
        <label htmlFor="">便: </label>
        <select name="" id="">
          <option value="">普通</option>
          <option value="">軟便</option>
          <option value="">下痢</option>
        </select>
      </div>
      <div>
        <label htmlFor="">食欲: </label>
        <select name="" id="">
          <option value="">いつもと同じ</option>
          <option value="">7割</option>
          <option value="">5割</option>
        </select>
      </div>
      <div>
        <label htmlFor="">薬 : </label>
        <input type="checkbox" value={true} />
        <label htmlFor="">服用</label>
        <input type="checkbox" value={false} />
        <label htmlFor="">なし</label>
      </div>
      <div>
        <label htmlFor="">症状 : </label>
        <input type="text" />
      </div>
      <button onClick={postClickHandler}>登録</button>
      <button onClick={cancelClickHandler}>キャンセル</button>
    </div>
  )
}

export default InputPatient
