import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function GalleryPage(){

    const user = useSelector((store) => store.user);
    const [imageList, setImageList] = useState([]);

    const getImages = () => {
        axios.get('/api/upload/image').then(response => {
            setImageList(response.data);
            }).catch(error => {
                console.log('error', error);
                alert('Something went wrong');
        });
    }
    
    useEffect(() => {
        getImages();
    }, []);

    return(
        <>
        <p>THIS IS THE GALLERY PAGE</p>
        {user.id && (
        <Link to="/upload">
            <button>Upload</button>
        </Link>
        )}
        </>
    )
};

export default GalleryPage;