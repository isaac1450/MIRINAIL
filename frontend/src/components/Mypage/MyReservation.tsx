import styled from "styled-components";
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import moment from 'moment'
import { useQuery } from "react-query";
import { getUserReservation } from "../../store/apis/book";
import { useNavigate, useParams } from "react-router-dom";
import { convertDate } from "../Commons/functions";

const Wrapper = styled.div`
  width: 768px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  .title {
    display: flex;
    width: 90%;
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 60px;
  }
  .subtitle {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 30px;
  }
  .cards {
    width: 100%;
    /* border: 1px solid black; */
    display: flex;
    flex-wrap: wrap;
    /* justify-content: center; */
    .card {
      position: relative;
      display: flex;
      flex-direction: row;
      width: 450px;
      height: 220px;
      margin: 10px 20px 30px 20px;
      padding: 20px 0;
      box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
      cursor: pointer;
      :hover {
        background-color: #f8f8fa;
      }
      .cardleft {
        border-right: 1px solid #e6e6e6;
        
        width: 180px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          border-radius: 50%;
          width: 110px;
          height: 110px;
        }
      }
      .cardright {
        padding: 0 10px 0 0;
        width: 260px;
        height: 100%;
        text-align: left;
        .cardright-top {
          padding-left: 25px;
          padding-top: 10px;
          height: 80px;
          border-bottom: 1px solid #d2d2d0;
          font-weight: 500;
          .name {
            font-size: 22px;
          }
          .shop {
            color: #717171;
          }
        }
        .cardright-bottom {
          padding: 15px 0 0 25px;
          height: 100px;
          font-size: 18px;
          div {
            display: flex;
            align-items: center;
          }
          svg {
            width: 10px;
            height: 10px;
            margin-right: 5px;
          }
        }
      }
    }
  }
  span {
    color: #8b70e6;
  }
  .nowRV {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 90%;
  }
  .history {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 90%;
    margin-top: 50px;
  }
  .designertextbox {
    position: relative;
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 30px;
    .line {
      position: absolute;
      width: 100%;
      border-bottom: 2px solid #8b70e6;
    }
  }
  table {
    width: 100%;
    tr {
      border-bottom: 1px solid #3d3c3a;
      cursor: pointer;
      :hover {
        background-color: #f8f8fa;
      }
    }
    th {
      padding: 10px;
    }
    .artist {
      text-align: left;
    }
    .count {
      text-align: right;
    }
  }
`;

interface IState {
  designer: {
    name: string;
    shop: string;
    imgurl: string;
    type: string;
    color: string;
    date: string;
    price: number;
  }
  reservation: {
    shop: string;
    count: number;
  }
}

const MyReservation = () => {
  const [designers, setDesigners] = useState<IState["designer"][]>([
    {
      name: "김다미 디자이너",
      shop: "nailshop1",
      imgurl: "https://mblogthumb-phinf.pstatic.net/MjAyMDAyMjRfMjU1/MDAxNTgyNTExOTM4NzI3.lxzK3zwTMmFs3FhkmLOWdaE0AMaPntOjtQnguqaL-Oog.ArD3XUOanpM9MqeHZRjuBTv5iifeuOG4oANhuDe8Lf0g.JPEG.pola0216/%EA%B9%80%EB%8B%A4%EB%AF%B8%EC%97%AC%EC%B9%9C%EC%A7%A401.jpg?type=w800",
      type: "글레이즈",
      color: "코랄 블루",
      date: "2022.04.14",
      price: 50000
    },
    {
      name: "김다미 디자이너",
      shop: "nailshop1",
      imgurl: "https://mblogthumb-phinf.pstatic.net/MjAyMDAyMjRfMjU1/MDAxNTgyNTExOTM4NzI3.lxzK3zwTMmFs3FhkmLOWdaE0AMaPntOjtQnguqaL-Oog.ArD3XUOanpM9MqeHZRjuBTv5iifeuOG4oANhuDe8Lf0g.JPEG.pola0216/%EA%B9%80%EB%8B%A4%EB%AF%B8%EC%97%AC%EC%B9%9C%EC%A7%A401.jpg?type=w800",
      type: "글레이즈",
      color: "코랄 블루",
      date: "2022.04.14",
      price: 50000
    },    
    {
      name: "김다미 디자이너",
      shop: "nailshop1",
      imgurl: "https://mblogthumb-phinf.pstatic.net/MjAyMDAyMjRfMjU1/MDAxNTgyNTExOTM4NzI3.lxzK3zwTMmFs3FhkmLOWdaE0AMaPntOjtQnguqaL-Oog.ArD3XUOanpM9MqeHZRjuBTv5iifeuOG4oANhuDe8Lf0g.JPEG.pola0216/%EA%B9%80%EB%8B%A4%EB%AF%B8%EC%97%AC%EC%B9%9C%EC%A7%A401.jpg?type=w800",
      type: "글레이즈",
      color: "코랄 블루",
      date: "2022.04.14",
      price: 50000
    },
  ]);
  const [reservations, setResevations] = useState<IState["reservation"][]>([
    {
      shop: "네일샵1",
      count: 1
    },
    {
      shop: "네일샵3",
      count: 234
    },
    {
      shop: "네일샵23",
      count: 3
    },
  ])
  const navigate = useNavigate();
  const { userSeq } = useParams();

  const { data, isLoading } = useQuery<any, Error>(
    ["getBookByDate" ],
    async () => {
      return await getUserReservation(Number(userSeq));
    },
    {
      onSuccess: (res) => {
        console.log(res);
        // setNailarts(res.content);
      },
      onError: (err: any) => console.log(err),
    }
  );

  const onClickDesigner = (designerSeq:number) => {
    navigate(`/designerpage/${designerSeq}/new`)
  }

  const onClickCard = (designerSeq:number) => {
    navigate(`/designerpage/${designerSeq}/new`)
  }

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <Wrapper>
      <div className="nowRV">
        <div className="subtitle">
          현재 <span>예약</span> 내역
        </div>
        <div className="cards">
          {data.bookList.map((book:any, idx:any) => {
            return (
              <div onClick={() => onClickCard(book.designerInfo.designerSeq)} className="card" key={idx}>
                <div className="cardleft">
                  <img src={book.designerInfo.designerInfoImgUrl} alt="" />
                </div>
                <div className="cardright">
                  <div className="cardright-top">
                    <div className="name">{book.designerInfo.designerShopName}</div>
                    <div className="shop">예약일: {moment(convertDate(book.bookDatetime)).format("MM/DD HH시 mm분")}</div>
                  </div>
                  <div className="cardright-bottom">
                    <div>
                      {book.nailart.nailartType} - {book.nailart.nailartDetailColor}
                    </div>
                    {/* <div>
                      <ArrowForwardIosIcon />
                      예약일: {designer.date}
                    </div> */}
                    <div>
                      <ArrowForwardIosIcon />
                      가격: {book.nailart.nailartPrice.toLocaleString()}원
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="history">
        <div className="subtitle">
          장영남님은 현재까지 총 <span>{data.visitCount}</span>회 예약하셨습니다.
        </div>
        <div className="designertextbox">
          아티스트
          <div className="line"></div>
        </div>
        <table>
          <colgroup>
            <col width="85%" />
            <col width="15%" />
          </colgroup>
          <tbody>
            {data.designerList.map((designer:any, idx:any) => {
              return (
                <tr key={idx} onClick={() => onClickDesigner(designer.designerInfo.designerSeq)}>
                  <th className="artist">{designer.designerInfo.designerShopName}</th>
                  <th className="count">{designer.designerCount}회</th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
}
export default MyReservation