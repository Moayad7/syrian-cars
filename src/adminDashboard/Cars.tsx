import React, { useEffect, useState } from "react";
import axios from "../config/axiosConfig"; // تعديل مسار الاستيراد حسب الحاجة

interface Car {
  id: number;
  name: string;
  brand: string;
  model: string;
  year: number;
}

const Cars: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCars, setTotalCars] = useState<number>(0);
  const carsPerPage = 10; // عدد السيارات في كل صفحة

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`/api/cars?page=${currentPage}&per_page=${carsPerPage}`); // تعديل نقطة النهاية حسب الحاجة
        setCars(response.data.data);
        setTotalCars(response.data.pagination.total); // افترض أن API يعيد العدد الإجمالي للسيارات
      } catch (err) {
        setError("حدث خطأ أثناء تحميل السيارات");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [currentPage]); // إعادة التحميل عند تغيير الصفحة الحالية

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // حساب عدد الصفحات
  const totalPages = Math.ceil(totalCars / carsPerPage);

  return (
    <div>
      <h2 className="text-xl font-bold">إدارة السيارات</h2>
      <table className="min-w-full mt-4 border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">اسم السيارة</th>
            <th className="border border-gray-300 p-2">الماركة</th>
            <th className="border border-gray-300 p-2">الموديل</th>
            <th className="border border-gray-300 p-2">سنة الصنع</th>
            <th className="border border-gray-300 p-2">التحكم</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id}>
              <td className="border border-gray-300 p-2">{car.id}</td>
              <td className="border border-gray-300 p-2">{car.name}</td>
              <td className="border border-gray-300 p-2">{car.brand}</td>
              <td className="border border-gray-300 p-2">{car.model}</td>
              <td className="border border-gray-300 p-2">{car.year}</td>
              <td className="border border-gray-300 p-2">
                <button className="px-2 py-1 bg-red-500 text-white rounded">حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          السابق
        </button>
        <span>
          الصفحة {currentPage} من {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          التالي
        </button>
      </div>
    </div>
  );
};

export default Cars;
