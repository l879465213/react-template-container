import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Button, CircularProgress, makeStyles } from "@material-ui/core";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { requestGet } from "../../services/network";
import consts from "../../libs/consts";
import { useDispatch } from "react-redux";
import { popupError } from "../../redux/popup/PopupActions";

export default forwardRef(function EditorWrap(
  { input, html, onHtmlChange, htmlPath },
  cref
) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const classes = useStyle();
  const ref = useRef();
  const [maxWidth, setMaxWidth] = useState();
  const [maxHeight, setMaxHeight] = useState();
  const [v, setV] = useState("");

  useImperativeHandle(cref, () => ({
    getHtml: () => {
      return v;
    },
  }));
  useEffect(() => {
    if (ref.current) {
      setMaxHeight(ref.current.offsetHeight);
      setMaxWidth(ref.current.clientWidth);
    }
  }, [ref.current, ref.current?.clientWidth, ref.current?.clientHeight]);

  useEffect(() => {
    if (html !== undefined) {
      setV(html);
    }
  }, [html]);
  useEffect(() => {
    if (htmlPath) {
      setLoading(true);
      requestGet({ url: consts.fileApiUrl + "/" + htmlPath })
        .then((data) => {
          onHtmlChange(data);
          return;
        })
        .catch((e) => {
          dispatch(popupError("데이터를 불러오는중 오류가 발생했습니다."));
          return;
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [htmlPath]);
  return (
    <div className={classes.root}>
      <div
        className={classes.wrap}
        ref={ref}
        style={
          Boolean(maxWidth) && Boolean(maxHeight)
            ? { width: maxWidth, height: maxHeight }
            : { flex: 1 }
        }
      >
        {loading
          ? null
          : Boolean(maxWidth) &&
            Boolean(maxHeight) && (
              <ReactQuill
                onBlur={() => {
                  onHtmlChange && onHtmlChange(v);
                }}
                readOnly={input}
                style={{
                  maxWidth: `${maxWidth}px`,
                  maxHeight: `${maxHeight}px`,
                  width: `${maxWidth}px`,
                  flex: 1,
                  //  height: `${maxHeight}px`,
                }}
                theme={input ? "bubble" : "snow"}
                value={v}
                modules={{
                  toolbar: [
                    [{ size: ["small", false, "large", "huge"] }],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["bold", "underline"],
                    ["link", "image"],
                  ],
                }}
                onChange={(e) => {
                  if (e.includes("'")) {
                    setV(e.replace("'", ""));
                    alert(" ' 문자는 사용 불가능합니다.");
                  } else {
                    setV(e);
                  }
                }}
              />
            )}
      </div>
    </div>
  );
});

const useStyle = makeStyles({
  button: {
    margin: "16px 8px",
    padding: "10px 75px",
  },
  wrap: {
    display: "flex",
    flexDirection: "column",
  },
  root: {
    display: "flex",
    marginBottom: "30px",
    flexDirection: "column",
    borderRadius: "5px",
    flex: 1,
    alignSelf: "stretch",
  },
});
