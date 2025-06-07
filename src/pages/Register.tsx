import React, { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast'; // Import toast for notifications
import axios from '../config/axiosConfig'; // Import the Axios instance

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPassword_confirmation] = useState('');
  const [role, setRole] = useState('admin'); // Default role
  const { toast } = useToast();

  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = () => {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    if (!token) {
      // Redirect to sign in if not authenticated
    } else {
      // Fetch properties if authenticated
      navigate('/');
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission

    const user = {
      name: name,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
      role: role
    }

    console.log(user);
    if (password !== password_confirmation) {
      toast({
        title: "خطأ",
        description: "كلمات المرور غير متطابقة.",
      });
      return;
    }

    try {
      const response = await axios.post('/auth/register', user); // Adjust the endpoint as necessary
      console.log(response.data);
      localStorage.setItem('token', response.data.token);
      toast({
        title: "نجاح",
        description: "تم إنشاء حسابك بنجاح.",
      });
      // Redirect or perform any other actions after successful registration
    } catch (error) {
      console.error("Error registering:", error);
      toast({
        title: "خطأ",
        description: "فشل تسجيل الحساب. تحقق من بياناتك.",
      });
    }
  };

  return (
    <MainLayout>
      <div className="container-custom py-20 min-h-screen flex flex-col items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 border border-border">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">إنشاء حساب جديد</h1>
            <p className="text-muted-foreground">سجل الآن للوصول إلى كافة خدمات مركز السيارات السوري</p>
          </div>
          
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium">الاسم الكامل</label>
              <input 
                type="text" 
                id="name" 
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="أدخل اسمك الكامل"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">البريد الإلكتروني</label>
              <input 
                type="email" 
                id="email" 
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="أدخل بريدك الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium">كلمة المرور</label>
              <input 
                type="password" 
                id="password" 
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="أدخل كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium">تأكيد كلمة المرور</label>
              <input 
                type="password" 
                id="confirmPassword" 
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="أعد إدخال كلمة المرور"
                value={password_confirmation}
                onChange={(e) => setPassword_confirmation(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="role" className="block text-sm font-medium">اختر دورك</label>
              <select 
                id="role" 
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="admin">أدمن</option>
                <option value="user">زبون</option>
                <option value="shop_manager">بائع</option>
                <option value="workshop">صاحب ورشة</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="terms" 
                className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <label htmlFor="terms" className="mr-2 block text-sm text-gray-700">
                أوافق على <Link to="/terms" className="text-primary hover:underline">الشروط والأحكام</Link> و <Link to="/privacy" className="text-primary hover:underline">سياسة الخصوصية</Link>
              </label>
            </div>
            
            <button 
              type="submit" 
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              تسجيل
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              لديك حساب بالفعل؟{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">
                تسجيل الدخول
              </Link>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Register;
