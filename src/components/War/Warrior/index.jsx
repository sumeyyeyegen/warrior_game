import React, { useContext, useEffect, useState } from 'react'

function Warrior({warrior}){
    return(
        <li>{warrior.name}</li>
    )
}
export default Warrior;