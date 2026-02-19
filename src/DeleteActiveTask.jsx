import {memo} from 'react'

const DeleteActiveTask = ({taskLength, clearActive}) => {
    // console.log('rerender DeleteActiveTask')
return <div>
    <p>Осталось дел: {taskLength}</p>
    <button className="search-btn" style={{marginBottom: '10px'}} onClick={clearActive}>Оистить выполненые</button>
</div>
}

export default memo(DeleteActiveTask);