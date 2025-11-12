import { FaSearch } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //creates urlParams obj
    const urlParams = new URLSearchParams(window.location.search);

    urlParams.set('searchTerm', searchTerm);

    //converts the obj into string
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className='shadow-lg'>
      <div className="flex items-center justify-between max-w-6xl mx-auto p-3">
        <Link to='/'>
          <h1 className="font-bold text-sm sm:text-3xl flex flex-wrap">
            <span className="text-primary">Elite</span>
            <span className="text-grayish">Estate</span>
          </h1>
        </Link>

        <form onSubmit={handleSubmit} className="bg-background p-3 rounded-lg flex items-center">
          <input type="text" placeholder="Search..." className="text-secondary focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} />
          <button>
            <FaSearch className='text-primary font-bold cursor-pointer' />
          </button>
        </form>

        <ul className='flex gap-4 text-[16px] items-center'>

          <Link to='/'>
            <li className='hidden sm:inline text-primary font-semibold hover:underline'>Home</li>
          </Link>

          <Link to='/about'>
            <li className='hidden sm:inline text-secondary font-semibold hover:underline hover:text-primary'>About</li>
          </Link>

          <Link to='/profile'>

            {currentUser ? <img src={currentUser.avatar} className='rounded-full w-10 h-10 object-cover' /> : <li className='font-semibold hover:underline hover:text-primary'>Sign In</li>
            }

          </Link>

        </ul>

      </div>

    </header>
  )
}

export default Header