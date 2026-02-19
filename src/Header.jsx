import { memo } from "react";
const Header = () => {
    // console.log('rerender Header')
    return <h1 style={{color: '#61dafbaa'}}>Мой To-Do List + API</h1>
};

export default memo(Header);
