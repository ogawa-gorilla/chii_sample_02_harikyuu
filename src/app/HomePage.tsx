import { useAppSelector } from "./hooks";
import LoginPage from "./LoginPage";

const HomePage = () => {
  const loggedIn = useAppSelector((state) => state.login.loggedIn);

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