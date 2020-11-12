import React, { useRef, useState } from "react";
import styled from "styled-components";

const ModalStyle = styled.div`
top:0;
position: fixed;
justify-content: center;
align-items: center;
width: 100%;
height: 100vh;
display: ${props=>props.openModal ? "flex":"none"};
background-color: rgba(0, 0, 0, 0.5);
z-index: 10;
section {
  background-color: white;
  width: 500px;
  height: 550px;
  .header {
    .close__btn {
      font-size: 12px;
      position: relative;
      left: 170px;
      cursor: pointer;
    }
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 25%;
    p {
      font-size: 25px;
    }
  }
  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 35%;
    input {
      width: 70%;
      height: 25px;
      font-size: 15px;
      transition: 0.4s ease-in-out;
      border: solid 0.1px lightgray;
      padding: 10px;
      :focus {
        outline: none;
        border: solid 0.1px orange;
      }
    }
    > div {
      width: 70%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        font-size: 12px;
        color: gray;
      }
      .checkbox {
        display: flex;
        align-items: center;
        justify-content: space-between;
        input {
          width: 15px;
          margin-right: 5px;
        }
      }
    }
  }

  .buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 40%;
    button {
      width: 70%;
      height: 40px;
      cursor: pointer;
      border-radius: 6px;
      :focus {
        outline: none;
      }
    }
    button:nth-child(1) {
      border: none;
      background-color: pink;
    }
    .already {
      font-size: 12px;
      color: gray;
      display: flex;
      justify-content: space-around;
      width: 50%;
      p:nth-child(2) {
        color: orange;
        cursor: pointer;
      }
    }
  }
}
`;

    const OpenReport = ( {openModal, setOpenModal} ) => {
      // const dispatch = useDispatch();
 
      // const [errorCode, setErrorCode] = useState(0);
    
      // const onChangeHandler = (e) => {
      //   setUser({
      //     ...user,
      //     [e.target.id]: e.target.value,
      //   });
      //   setErrorCode(0);
      //   if (e.key === "Enter") {
      //     signInHandler();
      //   }
      // };
    
      // const errorHandler = () => {
      //   if (!user.email) {
      //     setErrorCode(1);
      //     email.current.focus();
      //     return false;
      //   } else if (!user.password) {
      //     setErrorCode(2);
      //     password.current.focus();
      //     return false;
      //   }
      //   return true;
      // };
 
    
      // useEffect(() => {
      //   dispatch(authInit());
      //   if (signInStatus === "SUCCESS") {
      //     alert("로그인성공");
      //   } else if (signInStatus === "FAILURE") {
      //     setErrorCode(3);
      //   }
      // }, [signInStatus]);
    
      return (
        <>
          <ModalStyle openModal={openModal} >
            <section>
              <article className="header">
                <p
                  className="close__btn"
                  onClick={() => setOpenModal(false)}
                >
                  닫기
                </p>
                <p>신고내용</p>
                <input></input>
              </article>
     
         
            </section>
          </ModalStyle>
          {/* <ErrorBoxStyle error={errorCode}>{errorMsg[errorCode]}</ErrorBoxStyle> */}
        </>
      );
    };

    export default OpenReport;
