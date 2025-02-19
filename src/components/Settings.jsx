import { useState } from "react";

export default function Settings() {
    let [userSettings, setUserSettings] = useState({});

    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUserSettings({ ...userSettings, [name]: value });
    }

    let handleSubmit = (e) => {
        e.preventDefault();
        console.log(userSettings);
    }


    return (
        <div>
            <h1>Settings</h1>
            <form onSubmit={handleSubmit}>
                <label>Font Color</label>
                <input type="color" name="FontColor"  onChange={handleChange}/>
                <input type="text" name="FontFamily" onChange={handleChange}/>
                <input type="number" name="FontSize" onChange={handleChange}/>
                <input type="submit" />
            </form>
            <p style={{
                color: userSettings.FontColor,
                fontFamily: userSettings.FontFamily,
                'font-size': userSettings.FontSize + 'px'
                }}>Sample Text</p>
        </div>
    );
}