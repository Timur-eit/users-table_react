import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';

interface ITableHeaderProps {
    title: string;
    buttonClickAction: () => void;
}

function TableHeader(props: ITableHeaderProps) {
    const { title, buttonClickAction } = props;

    return (
        <div className="table-header">
            <div className="table-header__title">{title}</div>
            <div className="table-header__buttons-block">
                <Button
                    variant="primary"
                    onClick={() => {
                        buttonClickAction();
                    }}
                >
                    <div className="cross"></div>
                    <span>Добавить</span>
                </Button>
            </div>
        </div>
    );
}

export default TableHeader;
