import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BookItem from "../../components/Books/BookItem/BookItem";
import Banner from "../../images/home_banner.webp";
import styles from "./Home.module.css";
import { getBooks } from "../../lib/common";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Home() {
    const [books, setBooks] = useState(null);
    const [loading, setLoading] = useState(true);
    // eslint-disable-next-line max-len
    const displayBooks = () =>
        books ? (
            books.map((book) => <BookItem size={2} book={book} key={book.id} />)
        ) : (
            <h1>Vide</h1>
        );

    useEffect(() => {
        async function getBooksList() {
            const data = await getBooks();
            // setTimeout(() => {
            //     if (data) {
            //         setBooks(data);
            //         setLoading(false);
            //     }
            // }, 5000);
            if (data) {
                setBooks(data);
                setLoading(false);
            }
        }
        getBooksList();
    }, []);

    const backgroundImageStyle = { backgroundImage: `url(${Banner})` };

    return (
        <div className={styles.Home}>
            <div className={styles.banner} style={backgroundImageStyle} />
            <main className={styles.main}>
                <header className={styles.head}>
                    <h1>Nos Livres</h1>
                    <Link to="/Ajouter" className="button">
                        + Ajouter un livre
                    </Link>
                </header>
                <section className={styles.bookList}>
                    {loading ? (
                        <Skeleton count={1} height={260} width={190} />
                    ) : (
                        displayBooks()
                    )}
                </section>
            </main>
        </div>
    );
}

export default Home;
