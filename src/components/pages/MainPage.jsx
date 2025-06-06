import React, {useState} from 'react';
import {Button, List, message, Table} from 'antd';
import ApiService from '../../services/ApiService';
import {MessageType, showMessage} from '../../utils/messageUtils.ts';

function MainPage() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [messageApi, contextHolder] = message.useMessage();

    const columns = [
        {
            title: 'Название',
            dataIndex: 'title',
            key: 'title',
            width: 300,
            ellipsis: true,  // обрезать текст с многоточием, если не помещается
        },
        {
            title: 'Автор',
            dataIndex: 'author',
            key: 'author',
            width: 300,
            ellipsis: true,
        },
    ];
    const dataSource = books.map((book) => ({
        key: book.getId(), // уникальный ключ для Table
        title: book.getTitle(),
        author: book.getAuthorName(),
    }));


    const loadBooks = async () => {
        setLoading(true);
        showMessage(MessageType.Info, 'Loading started', messageApi);
        try {
            const booksArray = await ApiService.fetchBooks(); // возвращает Array<Book>
            setBooks(booksArray);
            showMessage(MessageType.Success, 'Books loaded', messageApi);
        } catch (err) {
            console.error('Ошибка при загрузке книг:', err); // лог в консоль
            setErrorMsg('Не удалось загрузить книги. Попробуйте позже.');
            showMessage(MessageType.Warning, 'Loading error!', messageApi)
        } finally {
            setLoading(false);
        }
    };

    // Вынесенная логика определения, что отображать под кнопкой
    let myMessage;
    if (errorMsg) {
        myMessage = <p style={{color: 'red'}}>{errorMsg}</p>;
    } else if (books.length === 0) {
        myMessage = <p>Книг пока нет. Нажмите кнопку для загрузки.</p>;
    } else {
        myMessage = null; // Сообщение не нужно
    }

    return (
        <div>
            {contextHolder}
            <Button type="primary" onClick={loadBooks} loading={loading} style={{marginBottom: '16px'}}>
                Загрузить книги
            </Button>

            {myMessage}

            {books.length > 0 && (
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    pagination={{pageSize: 10}}
                    scroll={{x: 500}}  // чтобы таблица горизонтально прокручивалась при необходимости
                />
            )}
        </div>
    );
};

export default MainPage;