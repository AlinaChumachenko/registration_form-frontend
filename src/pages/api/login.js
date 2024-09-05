export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const {email, password } = req.body;
  
      
        if (!email || !password) {
          return res.status(400).json({ message: 'Missing required fields' });
        }
  
        console.log('Log In data:', { email, password });
  
        return res.status(200).json({ message: 'User logged in successfully' });
      } catch (error) {
        console.error('User logged error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    } else {
      
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  }