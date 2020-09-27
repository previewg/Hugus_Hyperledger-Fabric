import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirm, confirmPwd } from "../../actions/auth";
import EditInfo from "./EditInfo";
import styled from "styled-components";

const Confirm = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  margin-left: 300px;
  .input_pwd {
    margin-top: 30px;
    justify-content: center;
    align-items: center;
    width: 25%;
    margin-left: 100px;
  }
`;

const ConfirmPwd = () => {
  const pwd_status = useSelector(
    (state) => state.authentication.status.confirm_pwd
  );
  const nickname = useSelector(
    (state) => state.authentication.status.currentUser
  );
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    username: nickname,
    password: "",
    code: 0,
  });
  const [modal, setModal] = useState(true);
  const onChangeHandler = (e) => {
    setUser({
      ...user,
      username: nickname,
      [e.target.id]: e.target.value,
    });
  };

  const submitHandler = () => {
    dispatch(confirmPwd({ user }));
    setUser({
      username: nickname,
      password: "",
    });
  };
  useEffect(() => {
    dispatch(confirm());
    if (pwd_status === "SUCCESS") {
      setUser({
        username: nickname,
        password: "",
        code: 1,
      });
      setModal(false);
    } else if (pwd_status === "FAILURE") {
      setUser({
        username: nickname,
        password: "",
      });
      alert("비밀번호가 일치하지 않습니당");
    }
  }, [pwd_status]);

  return (
    <>
      <Confirm>
        {modal === true ? (
          <article>
            <div>개인정보 보호를 위해 비밀번호를 다시 한번 입력해주세요</div>
            <input
              className="input_pwd"
              id="password"
              type="password"
              value={user.password}
              placeholder="비밀번호"
              onChange={onChangeHandler}
            />
            <button onClick={submitHandler}>확인</button>
          </article>
        ) : null}
        <div> {user.code === 1 ? <EditInfo /> : null}</div>
      </Confirm>
    </>
  );
};
export default ConfirmPwd;
