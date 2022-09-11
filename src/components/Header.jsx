import './Header.css'
import Counter from './Counter'

export default function Header({ count, setCount }) {
  return (
    <div className='headerContainer'>
      <span>My App</span>
      <Counter count={count} setCount={setCount} />
    </div>
  )
}
