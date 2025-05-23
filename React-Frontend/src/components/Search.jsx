

const Search = ({searchTerm, setSearchTerm}) => {
  return (
    <div className='p-3 border-b border-gray-800'>
      <input 
        type="text" 
        placeholder='Search notes...' 
        className="w-full p-2 text-white bg-gray-700 rounded " 
        value={searchTerm} onChange={(e) => setSearchTerm(e.target.value) } 
      />
    </div>
  );
}

export default Search;