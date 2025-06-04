import { useAppSelector } from "@/app/hooks";
import { Button, Card, Row } from "react-bootstrap";

export default function LoginButtonList() {

  const users = useAppSelector((state) => state.user.users);

  return (
  <Card style={{ width: '100%', maxWidth: '400px' }} className="p-4 shadow-sm">
    <div className="text-center">
      <p>サンプルサイト用ログインボタン:</p>
      {users.map((user) => (
        <Row className="mb-2" key={user.id}>
          <Button variant="success">{user.name}({user.role})としてログイン</Button>
        </Row>
      ))}
    </div>
    </Card>
)
  
}