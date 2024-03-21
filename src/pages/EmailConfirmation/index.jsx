import './style.css'
import { Container} from '@mui/material'
import ImageNavbar from "../../assets/image-navbar-confirm.png"
import ImageBody from "../../assets/image-body-confirm.png"
import Button from '@mui/material/Button'
 
const EmailConfirmation = () => {
    return (
        <Container>
            <div className="navbar-email-confirmation">
                <div className='flex items-center'>
                    <div className='mr-10'><img src={ImageNavbar} /></div>
                    <div className='font-400 text-24 font-montserrat'>Language</div>
                </div>
            </div>
 
            <div className="body-email-confirmation">
                <div className='flex flex-col items-center'>
                    <div ><img src={ImageBody} /></div>
                    <div className='mt-40 text-24 font-500 text-green font-montserrat'>Email Confirmation Success</div>
                    <div className='mt-8 text-16 text-gray-light font-montserrat'>Thanks for confirmation your email. Please login first</div>
                    <div className='mt-40'>
                        <Button variant='contained'
                        sx={{backgroundColor:'#226957',
                            padding:'16px 24px',
                            fontSize:'15px',
                            fontWeight:'600',
                            textTransform:'none',
                            lineHeight:'1',
                            borderRadius:'5px',
                            '&:hover': {
                                backgroundColor: 'green',
                            },
            }}>Login Here</Button>
                    </div>
                </div>
            </div>
        </Container>
    )
}
 
export default EmailConfirmation