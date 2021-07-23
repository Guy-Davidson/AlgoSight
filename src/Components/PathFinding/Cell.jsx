import React, { useEffect, useState } from 'react'
import '../../sass/Components/PathFinding/Cell.scss'

const Cell = (props) => {
    const [classes, setClasses] = useState(null)

    useEffect( () => {
        let currentClasses = ['Cell']

        if (!props.up) {            
            currentClasses.push('Up')
        }
        if (!props.down) {            
            currentClasses.push('Down')
        }
        if (!props.right) {            
            currentClasses.push('Right')
        }
        if (!props.left) {            
            currentClasses.push('Left')
        }
        if (props.isFinishPoint) {            
            currentClasses.push('Finish')
        }
        if (props.isDFSMarked) {            
            currentClasses.push('dfsMarked')
        }
        if (props.dfsPath) {            
            currentClasses.push('dfsPath')
        }

        setClasses(currentClasses)    
    }, [props.isDFSMarked, props.dfsPath, props.dfsParent])

    return (
        <div className={classes && classes.join(' ')}>            
        </div>
    )
}

export default Cell