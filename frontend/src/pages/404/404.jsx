import React from 'react';
import styles from './404.module.css'; 
import { VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function ErrPage() {
  return (
    <section>
        <div id={styles.title}>Simple Pure CSS3 • 404 Error Page</div>
        <div className={styles.circles}>
            <p>
            404
            <br />
            <VStack spacing={8}>
                <small>PAGE NOT FOUND</small>
                <small>Want to go <Link to='/'>Home</Link>?</small>
            </VStack>
            </p>
            <span className={`${styles.circle} ${styles.big}`} />
            <span className={`${styles.circle} ${styles.med}`} />
            <span className={`${styles.circle} ${styles.small}`} />
        </div>
    </section>

  )
}

