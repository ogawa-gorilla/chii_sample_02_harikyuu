import { useState } from 'react';
import { Alert, Button, Card, Container, Form, Row } from 'react-bootstrap';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // バリデーションとログイン処理
    if (!email || !password) {
      setError('メールアドレスとパスワードを入力してください');
      return;
    }

    // 認証処理をここに（API呼び出しなど）
    console.log({ email, password });

    setError('パスワードかメールアドレスが間違っています。');
  };

  return (
      <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100">
        <Card style={{ width: '100%', maxWidth: '400px' }} className="p-4 shadow-sm mb-3">
          <h3 className="mb-4 text-center">ログイン</h3>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleLogin}>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>メールアドレス</Form.Label>
              <Form.Control
                type="email"
                placeholder="例：manager@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="password" className="mb-4">
              <Form.Label>パスワード</Form.Label>
              <Form.Control
                type="password"
                placeholder="パスワードを入力"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <div className="d-grid mb-3">
              <Button variant="primary" type="submit">
                ログイン
              </Button>
            </div>
          </Form>
        </Card>
        <Card style={{ width: '100%', maxWidth: '400px' }} className="p-4 shadow-sm">
        <div className="text-center">
              <p>サンプルサイト用ログインボタン:</p>
              <Row className="mb-2">
              <Button variant="success">鈴木(店長)としてログイン</Button>
              </Row>
              <Row className="mb-2">
              <Button variant="success">佐藤(施術スタッフ)としてログイン</Button>
              </Row>
              <Row className="mb-2">
              <Button variant="success">山田(施術スタッフ)としてログイン</Button>
              </Row>
              <Row className="mb-2">
              <Button variant="success">上野(事務)としてログイン</Button>
              </Row>
            </div>
        </Card>
      </Container>
  );
}