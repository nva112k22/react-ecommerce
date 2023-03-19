import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { db } from '../firebase/config';
import { STORE_PRODUCTS } from '../redux/slice/productSlice';

const useFetchCollection = (collectionName) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getCollection = () => {
        setIsLoading(true);
        try {
          const docsRef = collection(db, collectionName);
    
          const q = query(docsRef, orderBy("createAt", "desc"));
          onSnapshot(q, (snapshot) => {
            const allData = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data()
            }));
            // console.log(allData);
            setData(allData);
            setIsLoading(false);
          });
        } catch(error) {
          setIsLoading(false);
          toast.error(error.message);
        }
      };
      useEffect(() => {
        getCollection()
      }, [])
  return {data, isLoading};
}

export default useFetchCollection