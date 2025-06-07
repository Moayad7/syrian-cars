import React, { useEffect, useState } from "react";
import axios from "../config/axiosConfig"; // تعديل مسار الاستيراد حسب الحاجة

interface Store {
  id: number;
  name: string;
  location: string;
  // إضافة خصائص أخرى حسب الحاجة
}

const Stores: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get("/api/stores"); // تعديل نقطة النهاية حسب الحاجة
        setStores(response.data);
        setLoading(true);
        console.log(response.data)
      } catch (err) {
        setError("حدث خطأ أثناء تحميل المتاجر");
        console.error(err)
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">إدارة المتاجر</h2>
      <button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">إضافة متجر</button>
      </div>
      <table className="min-w-full mt-4 border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">اسم المتجر</th>
            <th className="border border-gray-300 p-2">الموقع</th>
            <th className="border border-gray-300 p-2">التحكم</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store) => (
            <tr key={store.id}>
              <td className="border border-gray-300 p-2">{store.id}</td>
              <td className="border border-gray-300 p-2">{store.name}</td>
              <td className="border border-gray-300 p-2">{store.location}</td>
              <td className="border border-gray-300 p-2">
                <button className="px-2 py-1 bg-yellow-500 text-white rounded">تعديل</button>
                <button className="px-2 py-1 bg-red-500 text-white rounded">حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stores;
