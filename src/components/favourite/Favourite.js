import React from 'react'
import supabaseClient from '../../functions/supabaseClient';

function Favourite() {
    const onClick = async (e) => {
        e.preventDefault()
        try {

            // let { data: movies, error } = await supabaseClient
            //     .from('movies')
            //     .select('*')
            // console.log(movies, error);


            const { data, error } = await supabaseClient
                .from('movies')
                .insert([
                    { name: 'someValue', description: 'otherValue' },
                ])
                .select()
            console.log(data, error);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>

            <button onClick={onClick}>INSET</button>
        </div>
    )
}

export default Favourite