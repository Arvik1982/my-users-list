import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Временная имитация входа
      setTimeout(() => {
        localStorage.setItem('auth', 'true');
        navigate('/');
        setLoading(false);
      }, 1000);
    } catch {
      setError('Ошибка входа');
      setLoading(false);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.card}>
        <h2>Вход в систему</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.field}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="test@example.com"
            />
          </div>

          <div className={styles.field}>
            <label>Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          <button type="submit" disabled={loading} className={styles.submitBtn}>
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
