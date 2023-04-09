import React from 'react'
import { Link, Text } from '@chakra-ui/react'

function Footer() {
  return (
    <footer className='page-footer h-24 flex'>
      <div className='container mx-auto flex items-center justify-end'>
        <div className='contact'>
          <Link to="tel:+842873006595">Hotline: <span className='hotline'>028 7300 6595</span></Link>
          <Text>
            Thời gian làm việc: 7h30-17h, cả thứ 7, chủ nhật, xuyên trưa
          </Text>
        </div>
      </div>
    </footer>
  )
}

export default Footer