// import React, { useCallback, useRef, useState } from "react";
// import styled from "styled-components";
// import axios from "axios";
//
// const ActWriteStyle = styled.section`
//   display: flex;
//   justify-content: center;
//   margin-bottom: 200px;
//   .layout {
//     margin-top: 100px;
//     width: 700px;
//     display: flex;
//     flex-direction: column;
//     .write_title {
//       text-align: center;
//       font-size: 20px;
//       padding: 10px;
//       display: flex;
//       justify-content: center;
//       p {
//         width: 200px;
//         height: 40px;
//         border-bottom: solid orange 2px;
//       }
//     }
//     .title {
//       margin-top: 50px;
//       width: 100%;
//       display: flex;
//       align-items: center;
//       p {
//         font-weight: bold;
//         margin-right: 10px;
//         width: 100px;
//       }
//       input {
//         border: none;
//         width: 300px;
//         padding: 5px;
//         border-bottom: solid 0.1px lightgray;
//         transition: 0.3s ease-in-out;
//         :focus {
//           outline: none;
//           border-bottom: solid 0.1px orange;
//         }
//       }
//     }
//
//     .email {
//       margin-top: 50px;
//       width: 100%;
//       display: flex;
//       align-items: center;
//       p {
//         font-weight: bold;
//         margin-right: 10px;
//         width: 100px;
//       }
//       input {
//         border: none;
//         width: 200px;
//         padding: 5px;
//         border-bottom: solid 0.1px lightgray;
//         transition: 0.3s ease-in-out;
//         :focus {
//           outline: none;
//           border-bottom: solid 0.1px orange;
//         }
//       }
//     }
//
//     .goal {
//       margin-top: 50px;
//       width: 100%;
//       display: flex;
//       align-items: center;
//       p {
//         font-weight: bold;
//         margin-right: 10px;
//         width: 100px;
//       }
//       input {
//         border: none;
//         width: 110px;
//         padding: 5px;
//         border-bottom: solid 0.1px lightgray;
//         transition: 0.3s ease-in-out;
//         :focus {
//           outline: none;
//           border-bottom: solid 0.1px orange;
//         }
//       }
//     }
//
//     .content {
//       width: 100%;
//       margin-top: 50px;
//       display: flex;
//       flex-direction: column;
//       > p {
//         min-width: 50px;
//         font-weight: bold;
//       }
//       div {
//         display: grid;
//         grid-template-columns: 1fr 1fr;
//         margin-top: 20px;
//         justify-content: center;
//         input[type="file"] {
//           position: absolute;
//           width: 1px;
//           height: 1px;
//           padding: 0;
//           margin: -1px;
//           overflow: hidden;
//           clip: rect(0, 0, 0, 0);
//           border: 0;
//         }
//         .subImg {
//           justify-self: center;
//           width: 300px;
//           height: 300px;
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//           align-items: center;
//           border: 2px dashed lightgray;
//           border-radius: 10px;
//           background-position: center;
//           background-size: cover;
//           background-repeat: no-repeat;
//           background-color: ${(props) =>
//             props.subImgDrag ? "darkgray" : "transparent"};
//           background-image: ${(props) =>
//             props.preImgSub ? `url(${props.preImgSub.previewURL})` : "none"};
//           > label {
//             display: ${(props) =>
//               props.subImgDrag || props.subImg ? "none" : "block"};
//             font-size: 20px;
//           }
//           > p {
//             display: ${(props) =>
//               props.subImgDrag || props.subImg ? "none" : "block"};
//             color: orange;
//           }
//         }
//         .mainImg {
//           justify-self: center;
//           width: 300px;
//           height: 300px;
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//           align-items: center;
//           border: 2px dashed lightgray;
//           border-radius: 10px;
//           background-position: center;
//           background-size: contain;
//           background-repeat: no-repeat;
//           background-color: ${(props) =>
//             props.mainImgDrag ? "darkgray" : "transparent"};
//           background-image: ${(props) =>
//             props.preImgMain ? `url(${props.preImgMain.previewURL})` : "none"};
//           > label {
//             display: ${(props) =>
//               props.mainImgDrag || props.mainImg ? "none" : "block"};
//             font-size: 20px;
//           }
//           > p {
//             display: ${(props) =>
//               props.mainImgDrag || props.mainImg ? "none" : "block"};
//             color: orange;
//           }
//         }
//       }
//       .img__clear {
//         display: grid;
//         grid-template-columns: 1fr 1fr;
//         margin-top: 20px;
//         > button {
//           justify-self: center;
//           width: 100px;
//           height: 30px;
//           border-radius: 5px;
//           background-color: #cd5c5c;
//           color: white;
//           border: none;
//           cursor: pointer;
//           font-size: 15px;
//           outline: none;
//           :nth-child(1) {
//             visibility: ${(props) => (props.subImg ? "visible" : "hidden")};
//           }
//           :nth-child(2) {
//             visibility: ${(props) => (props.mainImg ? "visible" : "hidden")};
//           }
//         }
//       }
//     }
//
//     .hashtags {
//       font-weight: bold;
//       margin-top: 20px;
//       > div {
//         display: flex;
//         align-items: center;
//         width: 100%;
//         height: 50px;
//         overflow: paged-y;
//         input {
//           margin-right: 7px;
//           padding: 5px;
//           height: 20px;
//           outline: none;
//           border: none;
//           transition: 0.3s ease-in-out;
//           border-bottom: solid 0.1px lightgray;
//           :focus {
//             border-bottom: solid 0.1px orange;
//           }
//         }
//         .added__hashtag {
//           display: flex;
//           .hashtag {
//             padding: 10px;
//             border-radius: 20px;
//             background-color: orange;
//             font-size: 12px;
//             margin: 5px;
//             color: white;
//             font-weight: 200;
//             min-width: auto;
//           }
//           .clear {
//             position: relative;
//             border-radius: 7.5px;
//             font-size: 12px;
//             right: 15px;
//             top: -10px;
//             height: 15px;
//             width: 15px;
//             background-color: darkgray;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             cursor: pointer;
//           }
//         }
//       }
//     }
//
//     .submit {
//       width: 100%;
//       display: flex;
//       justify-content: flex-end;
//       align-items: center;
//       button {
//         margin-top: 15px;
//         border: none;
//         background: white;
//         font-size: 15px;
//         outline: none;
//         cursor: pointer;
//         font-weight: bold;
//         transition: 0.2s ease-in-out;
//         :hover {
//           color: orange;
//         }
//         > img {
//           margin-left: 10px;
//           width: 20px;
//           height: 20px;
//         }
//       }
//     }
//   }
// `;
//
// const ErrorBoxStyle = styled.p`
//   ${(props) => {
//     if (props.error == 0) {
//       return "display:none;opacity:0";
//     } else {
//       return "opacity:1;transform: translateX(-100px);";
//     }
//   }};
//   right: 0;
//   background-color: #ffa500;
//   border-radius: 5px;
//   color: white;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   position: fixed;
//   top: 100px;
//   width: 180px;
//   height: 50px;
//   transition: 0.7s ease-in-out;
//   font-size: 15px;
// `;
//
// const errorMsg = [
//   "",
//   "제목을 입력 바랍니다",
//   "캠페인명을 입력 바랍니다",
//   "수혜자를 입력 바랍니다",
//   "썸네일을 추가 바랍니다",
//   "내용을 첨부 바랍니다",
// ];
//
// const ActWrite = (props) => {
//   const title = useRef();
//   const email = useRef();
//   const subImg = useRef();
//   const mainImg = useRef();
//   const [data, setData] = useState({
//     title: "",
//     email: "",
//     subImg: null,
//     mainImg: null,
//   });
//   const [subImgDrag, setSubImgDrag] = useState(false);
//   const [mainImgDrag, setMainImgDrag] = useState(false);
//
//   const [filled, setFilled] = useState({
//     title: true,
//     email: true,
//     subImg: true,
//     mainImg: true,
//     hashtags: true,
//     goal: true,
//   });
//
//   const [errorCode, setErrorCode] = useState(0);
//
//   const [preImgSub, setPreImgSub] = useState(null);
//   const [preImgMain, setPreImgMain] = useState(null);
//
//   const [fileReaderState, setFileReaderState] = useState("");
//
//   const errorHandler = useCallback(() => {
//     if (!data.title) {
//       setErrorCode(1);
//       title.current.focus();
//       setFilled({
//         ...filled,
//         title: false,
//       });
//       return false;
//     } else if (!data.email) {
//       setErrorCode(2);
//       email.current.focus();
//       setFilled({
//         ...filled,
//         email: false,
//       });
//       return false;
//     } else if (!data.subImg) {
//       setErrorCode(3);
//       subImg.current.focus();
//       setFilled({
//         ...filled,
//         subImg: false,
//       });
//       return false;
//     } else if (!data.mainImg) {
//       setErrorCode(4);
//       mainImg.current.focus();
//       setFilled({
//         ...filled,
//         subImg: false,
//       });
//       return false;
//     } else if (data.goal === 0) {
//       setErrorCode(5);
//       goal.current.focus();
//       setFilled({
//         ...filled,
//         goal: false,
//       });
//       return false;
//     } else if (data.hashtags.length === 0) {
//       setErrorCode(6);
//       hashtags.current.focus();
//       setFilled({
//         ...filled,
//         hashtags: false,
//       });
//       return false;
//     }
//     return true;
//   }, [filled]);
//
//   const campaignAddHandler = async () => {
//     if (errorHandler()) {
//       const formData = new FormData();
//       formData.append("campaign_title", data.title);
//       formData.append("email", data.email);
//       formData.append("hashtags", data.hashtags);
//       formData.append("campaign_goal", data.goal);
//       for (const file of data.subImg) {
//         formData.append(`files`, file);
//       }
//       for (const file of data.mainImg) {
//         formData.append(`files`, file);
//       }
//       await axios
//         .post("/campaign/add", formData, {
//           headers: { "content-type": "multipart/form-data" },
//         })
//         .then(() => {
//           alert("성공적으로 등록되었습니다.");
//           props.history.push("/admin/only");
//         })
//         .catch((error) => {
//           alert("등록에 실패했습니다.");
//           console.error(error);
//         });
//     }
//   };
//
//   const preImgSubHandler = (e) => {
//     setPreImgSub(null);
//     for (const file of e.target.files) {
//       let reader = new FileReader();
//       reader.onloadend = () => {
//         setPreImgSub({
//           file: file,
//           previewURL: reader.result,
//         });
//         // setFileReaderState(e.target.file);
//       };
//       reader.readAsDataURL(file);
//     }
//   };
//
//   const preImgMainHandler = (e) => {
//     setPreImgMain(null);
//     for (const file of e.target.files) {
//       let reader = new FileReader();
//       reader.onloadend = () => {
//         setPreImgMain({
//           file: file,
//           previewURL: reader.result,
//         });
//         // setFileReaderState(e.target.file);
//       };
//       reader.readAsDataURL(file);
//     }
//   };
//
//   const onChangeHandler = (e) => {
//     e.preventDefault();
//     if (e.target.name === "subImg") {
//       preImgSubHandler(e);
//       setData({
//         ...data,
//         [e.target.name]: e.target.files,
//       });
//     } else if (e.target.name === "mainImg") {
//       preImgMainHandler(e);
//       setData({
//         ...data,
//         [e.target.name]: e.target.files,
//       });
//     } else {
//       setData({
//         ...data,
//         [e.target.name]: e.target.value,
//       });
//       setErrorCode(0);
//       if (e.target.name !== "hashtag") {
//         setFilled({
//           ...filled,
//           [e.target.name]: true,
//         });
//       }
//     }
//   };
//
//   const addHashtag = (e) => {
//     if (e.target.value === "") setErrorCode(6);
//     else {
//       let hashtags = data.hashtags.concat(e.target.value);
//       setData({
//         ...data,
//         hashtag: "",
//         hashtags,
//       });
//       setFilled({
//         ...filled,
//         hashtags: true,
//       });
//       setErrorCode(0);
//     }
//   };
//
//   const onTagDeleteHandler = useCallback(
//     (key) => () => {
//       let hashtags;
//       if (key === 0) {
//         hashtags = data.hashtags.slice(1, data.hashtags.length);
//       } else if (key === data.hashtags.length - 1) {
//         hashtags = data.hashtags.slice(0, key);
//       } else {
//         hashtags = data.hashtags
//           .slice(0, key)
//           .concat(data.hashtags.slice(key + 1, data.hashtags.length));
//       }
//       setData({
//         ...data,
//         hashtags,
//       });
//     },
//     [data]
//   );
//
//   const subImgDeleteHandler = () => {
//     setData({
//       ...data,
//       subImg: null,
//     });
//     setPreImgSub(null);
//   };
//
//   const mainImgDeleteHandler = () => {
//     setData({
//       ...data,
//       mainImg: null,
//     });
//     setPreImgMain(null);
//   };
//
//   const dragOver = (e) => {
//     e.stopPropagation();
//     e.preventDefault();
//     if (e.target.className === "subImg") setSubImgDrag(true);
//     else if (e.target.className === "mainImg") setMainImgDrag(true);
//   };
//
//   const dragLeave = (e) => {
//     e.stopPropagation();
//     e.preventDefault();
//     if (e.target.className === "subImg") setSubImgDrag(false);
//     else if (e.target.className === "mainImg") setMainImgDrag(false);
//   };
//
//   const uploadFiles = (e) => {
//     e.stopPropagation();
//     e.preventDefault();
//     const files = e.dataTransfer.files;
//
//     if (files.length > 1) {
//       alert("하나만 가능합니다");
//       return;
//     }
//
//     if (files[0].type.match(/image.*/)) {
//     } else {
//       alert("이미지 파일이 아닙니다.");
//       return;
//     }
//
//     if (e.target.className === "subImg") {
//       setPreImgSub(null);
//       for (const file of files) {
//         let reader = new FileReader();
//         reader.onloadend = () => {
//           setPreImgSub({
//             file: file,
//             previewURL: reader.result,
//           });
//         };
//         reader.readAsDataURL(file);
//       }
//       setData({
//         ...data,
//         [e.target.className]: files,
//       });
//       setSubImgDrag(false);
//     } else if (e.target.className === "mainImg") {
//       setPreImgMain(null);
//       for (const file of files) {
//         let reader = new FileReader();
//         reader.onloadend = () => {
//           setPreImgMain({
//             file: file,
//             previewURL: reader.result,
//           });
//         };
//         reader.readAsDataURL(file);
//       }
//       setData({
//         ...data,
//         [e.target.className]: files,
//       });
//       setMainImgDrag(false);
//     }
//   };
//
//   return (
//     <>
//       <ActWriteStyle
//         preImgSub={preImgSub}
//         preImgMain={preImgMain}
//         subImgDrag={subImgDrag}
//         mainImgDrag={mainImgDrag}
//         subImg={data.subImg}
//         mainImg={data.mainImg}
//       >
//         <div className="layout">
//           <div className="write_title">
//             <p>캠페인 등록</p>
//           </div>
//           <div className="title">
//             <p>제목</p>
//             <input
//               name="title"
//               ref={title}
//               value={data.title}
//               type="text"
//               placeholder="제목을 입력하세요."
//               onChange={onChangeHandler}
//             />
//           </div>
//
//           <div className="email">
//             <p>수혜자(email)</p>
//             <input
//               name="email"
//               ref={email}
//               value={data.email}
//               type="text"
//               placeholder="수헤자 이메일을 입력하세요."
//               onChange={onChangeHandler}
//             />
//           </div>
//
//           <div className="goal">
//             <p>목표 기부 금액</p>
//             <input
//               name="goal"
//               ref={goal}
//               value={data.goal}
//               type="number"
//               placeholder="기부 금액을 입력하세요."
//               onChange={onChangeHandler}
//             />
//             <p>원</p>
//           </div>
//
//           <div className="content">
//             <p>파일 첨부</p>
//             <div>
//               <div
//                 className="subImg"
//                 onDragOver={dragOver}
//                 onDragLeave={dragLeave}
//                 onDrop={uploadFiles}
//               >
//                 <label htmlFor="subImg">썸네일</label>
//                 <p> Drag&Drop</p>
//                 <input
//                   id="subImg"
//                   name="subImg"
//                   type="file"
//                   accept="image/*"
//                   onChange={onChangeHandler}
//                 />
//               </div>
//               <div
//                 className="mainImg"
//                 onDragOver={dragOver}
//                 onDragLeave={dragLeave}
//                 onDrop={uploadFiles}
//               >
//                 <label htmlFor="mainImg">본문</label>
//                 <p> Drag&Drop</p>
//                 <input
//                   id="mainImg"
//                   name="mainImg"
//                   type="file"
//                   accept="image/*"
//                   onChange={onChangeHandler}
//                 />
//               </div>
//             </div>
//             <div className="img__clear">
//               <button onClick={subImgDeleteHandler}>썸네일 초기화</button>
//               <button onClick={mainImgDeleteHandler}>본문 초기화</button>
//             </div>
//           </div>
//
//           <div className="hashtags">
//             <p>태그</p>
//             <div>
//               <input
//                 name="hashtag"
//                 ref={hashtags}
//                 value={data.hashtag}
//                 placeholder="# 태그입력"
//                 onChange={onChangeHandler}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") addHashtag(e);
//                 }}
//               />
//               {data.hashtags.map((hashtag, key) => {
//                 return (
//                   <div className="added__hashtag" key={key}>
//                     <p className="hashtag"># {hashtag}</p>
//                     <p
//                       className="clear"
//                       onClick={onTagDeleteHandler(key)}
//                       key={key + 100}
//                     >
//                       x
//                     </p>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//
//           <div className="submit">
//             <button onClick={campaignAddHandler}>
//               등록하기
//               <img alt="submit" src="/icons/PaperPlane.png" />
//             </button>
//           </div>
//         </div>
//       </ActWriteStyle>
//       <ErrorBoxStyle error={errorCode}>{errorMsg[errorCode]}</ErrorBoxStyle>
//     </>
//   );
// };
//
// export default ActWrite;
