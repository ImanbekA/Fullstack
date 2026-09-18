import { Link } from "react-router-dom";
export function Header() {
    return(
        <header>
            <nav>
                <Link to="/profile">Личный кабинет</Link>
                <Link to="/assessment">Оценка повреждений</Link>
                <Link to="/history">История оценок</Link>
            </nav>
        </header>
    )
}