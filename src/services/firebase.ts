import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB6-x6wT4_9HLUuuq6jgsPqo67ju0Bdnsc",
    authDomain: "e-commerce-app-e7eb5.firebaseapp.com",
    projectId: "e-commerce-app-e7eb5",
    storageBucket: "e-commerce-app-e7eb5.firebasestorage.app",
    messagingSenderId: "1015647469398",
    appId: "1:1015647469398:web:aa27be42d5ad8ea8e3e0f7",
    measurementId: "G-VVCGGE2FYN"
  };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export const fetchProducts = async (): Promise<Product[]> => {
  const productsCollection = collection(db, 'products');
  const productSnapshot = await getDocs(productsCollection); 
  const productList: Product[] = productSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[]; 
  return productList;
};



export const fetchFeaturedProducts = async () => {
  const productsCollection = collection(db, 'products'); 
  const productSnapshot = await getDocs(productsCollection);
  const productList = productSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  return productList;
};


export const fetchProductById = async (id: string): Promise<Product | null> => {
  const productDoc = await getDoc(doc(db, 'products', id)); 
  if (productDoc.exists()) {
    return { id: productDoc.id, ...productDoc.data() } as Product;
  } else {
    return null; 
  }
};

export { auth };
