import LoginPage from "./features/login/LoginPage";
import { useAppSelector } from "./hooks";
import { isLoggedin } from "./store/loginSlice";

const HomePage = () => {
  const loggedIn = useAppSelector(isLoggedin);

  return (
    <div>
      {
        loggedIn ? (
          <div>
            <h1>ダッシュボード</h1>
            <p>本日の予約、シフト情報、施術履歴などをここに表示します。</p>
          </div>
        ) : (
          <LoginPage />
        )
      }
    </div>
  )
}

export default HomePage;