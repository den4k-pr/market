import { useCart } from '@/hooks/useCart';
import cn from 'clsx';
import { SetStateAction } from "react";
import { useState } from "react";
import { useRouter } from "next/router"
import emailjs from 'emailjs-com';

type FormData = {
    name: string;
    lastName: string;
    email: string;
    phone: string;
    productName: string[];
    productPrice: number[];
    totalPrice: number;
  };
  
type Messages = {
  error: boolean;
  success: boolean;
  loading: boolean;
};

type SendEmailProps = {
  setIsShow2: React.Dispatch<SetStateAction<boolean>>;
  activeClass: string;
  ref2: any;
};

export const SendEmail = ({ setIsShow2, activeClass, ref2 }: SendEmailProps) => {
  const { items, total } = useCart();

  const [goodJob, setGoodJob] = useState(false)

  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    productName: items.map(el => el.product.name),
    productPrice: items.map(el => el.price),
    totalPrice: total
  });

  const [messages, setMessages] = useState<Messages>({
    error: false,
    success: false,
    loading: false
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setGoodJob(true)

    setMessages({ error: false, success: false, loading: true });

    const templateParams = {
      ...formData
    };

    try {
      await emailjs.send(
        'service_ugc7dcw',
        'template_9v7xm1t',
        templateParams,
        'B3uHEg9VYxDRxtTJq',
      );
      console.log('Email sent successfully!');
      setMessages({ error: false, success: true, loading: false });
    } catch (error) {
      console.error('Error sending email:', error);
      setMessages({ error: true, success: false, loading: false });
      setTimeout(() => {
        setMessages({ error: false, success: false, loading: false });
      }, 3000);
    }

    // Очистити поля форми після відправлення
    setTimeout(() => {
        router.reload()
        setMessages({ error: false, success: false, loading: false });
        setGoodJob(false)
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return(
    <section className={cn('auth', 'auth2', activeClass)}>
      <div className='authHide' onClick={() => setIsShow2(false)}></div>
      <form onSubmit={handleSubmit} onClick={() => setIsShow2(true)} className='auth__form'>
        <h2 style={{fontSize: '25px', fontWeight: '600', paddingBottom: '15px'}}>Fill in the data</h2>

        <nav className='auth__list'>
          {items.map((item, index) => 
            <ul key={item.id} className='auth__list-el'>
              <li className='auth__list-el-name'><span>{index + 1}.</span>{item.product.name}</li>
              <li className='auth__list-el-price'>{item.product.price} $</li>
            </ul>    
          )}
        </nav>

        <label className='form-label'><span>Name</span>
          <input className="form-label-input" type="text" name="name" onChange={handleChange} required />
        </label>
        <label className='form-label'><span>Last Name</span>
          <input className="form-label-input" type="text" name="lastName" onChange={handleChange} required />
        </label>
        <label className='form-label'><span>Email</span>
          <input className="form-label-input" type="email" name="email" onChange={handleChange} required />
        </label>
        <label className='form-label'><span>Phone</span>
          <input className="form-label-input" type="tel" name="phone" onChange={handleChange} required />
        </label>
        <button className="button" type="submit">To order</button>
        {
            goodJob && <p className='message'>{messages.error && 'error'}{messages.loading && 'loading'}{messages.success && 'success'}</p>
        }
     </form>
    </section>
  );
};
