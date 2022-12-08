import styles from "./styles.module.css";
import './App.css';
import Header from "./PageHeader";
import SearchForm from "./SearchForm";
import Card from "./Card";
import {useEffect, useState} from "react";
import axios from "axios";

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

    const [user, setUser] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        fetchUserData('ritikchelani')
    },[])
    function handleSearch(username) {
        setLoading(true)
        setUser('')
        fetchUserData(username)
    }

    function fetchUserData(username) {
        axios.get(  `https://api.github.com/users/${username}`)
            .then((res) => {
                setLoading(false)
                setError(false)
                setUser(res.data)
            })
            .catch(() => {
                setLoading(false)
                setError(true)
            })
    }

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>Github Users</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>

            <Header/>
            <SearchForm handleSearch={handleSearch} hasError={error} hasLoading={loading}/>
            <Card userData={user} hasError={error} hasLoading={loading}/>

		</div>
	);
};

export default Main;