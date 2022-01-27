import { useState, useEffect } from "react";
import _ from "lodash";

import api from "../../api";
import "./news.less";

export default function News() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    const result = await api.getNews(page);
    const rdata = result.data.data;
    setData([...data, ...rdata]);
  };

  useEffect(() => {
    window.addEventListener("scroll", _.debounce(reachBottom, 300));
    return () => {
      window.removeEventListener("scroll", _.debounce(reachBottom, 300));
    };
  });

  useEffect(() => {
    fetchData();
  }, [page]);

  function getDate(timeStamp) {
    const date = new Date(Number(timeStamp * 1000));
    // const Y = date.getFullYear() + "-";
    const M =
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) + "-";
    const D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
    const h = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
    const m = (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) ;
    // const s = date.getSeconds();
    return M + D + h + m;
  }
  function getScrollTop() {
    var scrollTop = 0,
      bodyScrollTop = 0,
      documentScrollTop = 0;
    if (document.body) {
      bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
      documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop =
      bodyScrollTop - documentScrollTop > 0 ? bodyScrollTop : documentScrollTop;
    return scrollTop;
  }
  function getScrollHeight() {
    let scrollHeight = 0;
    if (document.body) {
      var bSH = document.body.scrollHeight;
    }
    if (document.documentElement) {
      var dSH = document.documentElement.scrollHeight;
    }
    scrollHeight = bSH - dSH > 0 ? bSH : dSH;
    return scrollHeight;
  }
  function getWindowHeight() {
    var windowHeight = 0;
    if (document.compatMode === "CSS1Compat") {
      windowHeight = document.documentElement.clientHeight;
    } else {
      windowHeight = document.body.clientHeight;
    }
    return windowHeight;
  }

  function reachBottom() {
    if (getScrollTop() + getWindowHeight() + 10 >= getScrollHeight()) {
      console.log("已经到最底部了! page=", page);
      setPage(page + 1);
    }
  }

  return (
    <ul className="news_wrap">
      {data.map((item, idx) => {
        return (
          <li className="news_card" key={idx}>
            <div className="news_card_content">
              {item.img_count > 0 && (
                <a href={item.url} rel="noreferrer" target="_blank">
                  <img
                    src={item.thumb}
                    alt={item.title}
                    onMouseOver={(e) => e.target.classList.add("bigger")}
                    onMouseOut={(e) => e.target.classList.remove("bigger")}
                  />
                </a>
              )}
              <div className="news_card_text">
                <a rel="noreferrer" target="_blank" href={item.url}>{item.title}</a>
              </div>
            </div>
            <div className="news_card_detail">
              <div className="news_card_time_wrapper">
                <span className="news_card_time">{getDate(item.ctime)}</span>
                <span className="news_card_tag">
                  {Array.prototype.join.call(item.tags," ")}
                </span>
              </div>
              
              <span className="news_card_media">{item.media}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
