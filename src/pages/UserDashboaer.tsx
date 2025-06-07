import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import axios from '../config/axiosConfig'; // Import the Axios instance
import Spinner from '@/components/ui/Spinner';

const UserDashboard = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 10; // Number of cars to show per page
  const [totalCars, setTotalCars] = useState(0); // Total cars count from API
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
      checkToken();
    }, []);
    
     const checkToken = () => {
      const token = localStorage.getItem("token"); // Retrieve token from local storage
      if (!token) {
        // Redirect to sign in if not authenticated
        navigate("/login");
      } else {
        // Fetch properties if authenticated
        //  navigate(location.pathname);
      }
    };
  
   
    

  // Fetch cars for the current page
  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        // Assuming your API accepts query params: page and limit
        const response = await axios.get(`/api/cars?page=${currentPage}&per_page=${carsPerPage}`);
        /*
          Assuming API response structure:
          {
            data: { data: [...cars], total: <totalCount> }
          }
          Adjust below accordingly if different.
        */
        const responseData = response.data;
        console.log(responseData)
        setCars(responseData.data || []);
        setTotalCars(responseData.pagination.total || 0);
      } catch (error) {
        console.error('Error fetching cars:', error);
        toast({
          title: 'خطأ',
          description: 'حدث خطأ أثناء تحميل السيارات.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [currentPage, carsPerPage, toast]);

  const handleDelete = async (carId) => {
    try {
      await axios.delete(`/api/cars/${carId}`);
      toast({
        title: 'تم الحذف',
        description: 'تم حذف السيارة بنجاح.',
      });
      // Refetch current page cars after deletion
      // If cars on this page become zero, go to previous page if possible
      if (cars.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        // simply fetch current page again
        setLoading(true);
        const response = await axios.get(`/api/cars?page=${currentPage}&per_page=${carsPerPage}`);
        const responseData = response.data;
        setCars(responseData.data || []);
        setTotalCars(responseData.total || 0);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error deleting car:', error);
      toast({
        title: 'خطأ',
        description: 'حدث خطأ أثناء حذف السيارة.',
      });
    }
  };

  const handleCreate = () => {
    // Logic to create a new car
  };

  const totalPages = Math.ceil(totalCars / carsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // if (!token) {
  //   navigate('/login')
  // }

  return (
    <MainLayout>
      <div className="container-custom py-28">
        <h1 className="text-2xl font-bold mb-6">لوحة التحكم</h1>
        <div className="flex gap-2">
          <Link to={'/'} onClick={handleCreate}>
            <Button className="mb-4">إضافة سيارة جديدة</Button>
          </Link>
          <Link to={'/add-workshop'} onClick={handleCreate}>
            <Button className="mb-4">إضافة ورشة</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.length === 0 && (
            <p className="text-center col-span-full">لا توجد سيارات لعرضها.</p>
          )}
          {loading ? 
          <Spinner />
          : 
           
           cars.map((car) => (
            <Card key={car.id}>
              <CardContent>
                <img
                  src={car.thumbnail}
                  alt={car.name}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h2 className="text-xl font-bold mt-2">{car.name}</h2>
                <div className="flex gap-2 mt-4">
                  <Link to={`/edit-car/${car.id}`}>
                    <Button variant="outline">تعديل</Button>
                  </Link>
                  <Button variant="outline" onClick={() => handleDelete(car.id)}>
                    حذف
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        }
        
        </div>

        <div className="flex justify-between mt-6">
          <Button onClick={handlePrevPage} disabled={currentPage <= 1}>
            السابق
          </Button>
          <div className="self-center">
            الصفحة {currentPage} من {totalPages}
          </div>
          <Button onClick={handleNextPage} disabled={currentPage >= totalPages}>
            التالي
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default UserDashboard;
