import React from 'react'

import IconAdd from 'react-icons/lib/fa/plus'

import { storiesOf } from '@storybook/react'

import { ThemeProvider } from 'react-css-themr'

import Button from '../../src/components/Button'

import highContrastTheme from '../../src/components/Button/highContrastTheme/index.css'
import defaultTheme from '../../src/components/Button/defaultTheme/index.css'

import styles from './style.css'

storiesOf('Buttons', module)
  .add('defaultTheme', () => (
    <ThemeProvider theme={{ PLButton: defaultTheme }}>
      <div className={styles.container}>
        <h2>Default Button</h2>

        <div className={styles.spacingAround}>
          <Button>Call to Action</Button>
          <Button relevance="high">Call to Action</Button>
          <Button relevance="low">Call to Action</Button>
        </div>

        <h2>Gradient</h2>
        <div className={styles.spacingAround}>
          <Button fill="gradient">Call to Action</Button>
          <Button relevance="high" fill="gradient">Call to Action</Button>
        </div>

        <h2>Outline Button</h2>

        <div className={styles.spacingAround}>
          <Button fill="outline">Call to Action</Button>
          <Button relevance="high" fill="outline">Call to Action</Button>
          <Button relevance="low" fill="outline">Call to Action</Button>
        </div>

        <h2>Clean Button</h2>

        <div className={styles.spacingAround}>
          <Button fill="clean">Call to Action</Button>
          <Button relevance="high" fill="clean">Call to Action</Button>
          <Button relevance="low" fill="clean">Call to Action</Button>
        </div>

        <h2>All buttons with icons</h2>

        <div className={styles.spacingAround}>
          <Button><IconAdd />Call to Action</Button>
          <Button relevance="high"><IconAdd />Call to Action</Button>
          <Button relevance="low"><IconAdd />Call to Action</Button>
        </div>

        <div className={styles.spacingAround}>
          <Button fill="gradient"><IconAdd />Call to Action</Button>
          <Button relevance="high" fill="gradient"><IconAdd />Call to Action</Button>
        </div>

        <div className={styles.spacingAround}>
          <Button fill="outline"><IconAdd />Call to Action</Button>
          <Button relevance="high" fill="outline"><IconAdd />Call to Action</Button>
          <Button relevance="low" fill="outline"><IconAdd />Call to Action</Button>
        </div>

        <div className={styles.spacingAround}>
          <Button fill="clean"><IconAdd />Call to Action</Button>
          <Button relevance="high" fill="clean"><IconAdd />Call to Action</Button>
          <Button relevance="low" fill="clean"><IconAdd />Call to Action</Button>
        </div>

        <h2>Sizes</h2>

        <div className={styles.spacingAround}>
          <Button size="extra-small">extra-small</Button>
        </div>

        <div className={styles.spacingAround}>
          <Button size="small">small</Button>
        </div>

        <div className={styles.spacingAround}>
          <Button>Default</Button>
        </div>

        <div className={styles.spacingAround}>
          <Button size="large">Default</Button>
        </div>

        <h2>All disabled</h2>

        <div className={styles.spacingAround}>
          <Button disabled><IconAdd />Call to Action</Button>
          <Button relevance="high" disabled><IconAdd />Call to Action</Button>
          <Button relevance="low" disabled><IconAdd />Call to Action</Button>
        </div>

        <div className={styles.spacingAround}>
          <Button fill="gradient" disabled><IconAdd />Call to Action</Button>
          <Button relevance="high" fill="gradient" disabled><IconAdd />Call to Action</Button>
        </div>

        <div className={styles.spacingAround}>
          <Button fill="outline" disabled><IconAdd />Call to Action</Button>
          <Button relevance="high" fill="outline" disabled><IconAdd />Call to Action</Button>
          <Button relevance="low" fill="outline" disabled><IconAdd />Call to Action</Button>
        </div>

        <div className={styles.spacingAround}>
          <Button fill="clean" disabled><IconAdd />Call to Action</Button>
          <Button relevance="high" fill="clean" disabled><IconAdd />Call to Action</Button>
          <Button relevance="low" fill="clean" disabled><IconAdd />Call to Action</Button>
        </div>
      </div>
    </ThemeProvider>
  ))
  .add('highContrastTheme', () => (
    <ThemeProvider theme={{PLButton: highContrastTheme}}>
      <div className={styles.container}>
        <h2>Default Button</h2>

        <div className={styles.spacingAround}>
          <Button>Call to Action</Button>
          <Button relevance="high">Call to Action</Button>
          <Button relevance="low">Call to Action</Button>
        </div>

        <h2>Gradient</h2>
        <div className={styles.spacingAround}>
          <Button fill="gradient">Call to Action</Button>
          <Button relevance="high" fill="gradient">Call to Action</Button>
        </div>

        <h2>Outline Button</h2>

        <div className={styles.spacingAround}>
          <Button fill="outline">Call to Action</Button>
          <Button relevance="high" fill="outline">Call to Action</Button>
          <Button relevance="low" fill="outline">Call to Action</Button>
        </div>

        <h2>Clean Button</h2>

        <div className={styles.spacingAround}>
          <Button fill="clean">Call to Action</Button>
          <Button relevance="high" fill="clean">Call to Action</Button>
          <Button relevance="low" fill="clean">Call to Action</Button>
        </div>

        <h2>All buttons with icons</h2>

        <div className={styles.spacingAround}>
          <Button><IconAdd />Call to Action</Button>
          <Button relevance="high"><IconAdd />Call to Action</Button>
          <Button relevance="low"><IconAdd />Call to Action</Button>
        </div>

        <div className={styles.spacingAround}>
          <Button fill="gradient"><IconAdd />Call to Action</Button>
          <Button relevance="high" fill="gradient"><IconAdd />Call to Action</Button>
        </div>

        <div className={styles.spacingAround}>
          <Button fill="outline"><IconAdd />Call to Action</Button>
          <Button relevance="high" fill="outline"><IconAdd />Call to Action</Button>
          <Button relevance="low" fill="outline"><IconAdd />Call to Action</Button>
        </div>

        <div className={styles.spacingAround}>
          <Button fill="clean"><IconAdd />Call to Action</Button>
          <Button relevance="high" fill="clean"><IconAdd />Call to Action</Button>
          <Button relevance="low" fill="clean"><IconAdd />Call to Action</Button>
        </div>

        <h2>Sizes</h2>

        <div className={styles.spacingAround}>
          <Button size="extra-small">extra-small</Button>
        </div>

        <div className={styles.spacingAround}>
          <Button size="small">small</Button>
        </div>

        <div className={styles.spacingAround}>
          <Button>Default</Button>
        </div>

        <div className={styles.spacingAround}>
          <Button size="large">Default</Button>
        </div>

        <h2>All disabled</h2>

        <div className={styles.spacingAround}>
          <Button disabled><IconAdd />Call to Action</Button>
          <Button relevance="high" disabled><IconAdd />Call to Action</Button>
          <Button relevance="low" disabled><IconAdd />Call to Action</Button>
        </div>

        <div className={styles.spacingAround}>
          <Button fill="gradient" disabled><IconAdd />Call to Action</Button>
          <Button relevance="high" fill="gradient" disabled><IconAdd />Call to Action</Button>
        </div>

        <div className={styles.spacingAround}>
          <Button fill="outline" disabled><IconAdd />Call to Action</Button>
          <Button relevance="high" fill="outline" disabled><IconAdd />Call to Action</Button>
          <Button relevance="low" fill="outline" disabled><IconAdd />Call to Action</Button>
        </div>

        <div className={styles.spacingAround}>
          <Button fill="clean" disabled><IconAdd />Call to Action</Button>
          <Button relevance="high" fill="clean" disabled><IconAdd />Call to Action</Button>
          <Button relevance="low" fill="clean" disabled><IconAdd />Call to Action</Button>
        </div>
      </div>
    </ThemeProvider>
  ))
