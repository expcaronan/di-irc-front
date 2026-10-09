import React, { useState } from 'react'
import { registerPushNotifications } from '../webPushService';

function EnablePushNotifications() {
  const [loading, setLoading] = 
  useState(false); 
  const [enabled, setEnabled] = useState( Notification.permission === "granted" ); 
  const enableNotifications = async () => { 
    try { setLoading(true); 
        console.log( "Starting Web Push registration..." ); 
        const subscription = await registerPushNotifications(); 
        console.log( "Web Push subscription:", subscription ); 
        setEnabled(true); alert( "Browser notifications have been enabled!" ); 
    } catch (error) 
    { console.error( "Web Push registration failed:", error ); 
        alert( error instanceof Error ? error.message : "Unable to enable browser notifications." ); } 
        finally { 
            setLoading(false); 
        } }; 
        // Browser already has permission 
        if (enabled) 
            { return ( 
            <div className="alert alert-success d-flex align-items-center mb-3" role="alert" > 
            <span className="me-2" style={{ fontSize: "20px" }} > 🔔 
                </span> 
                <div> 
                    <strong> Browser notifications enabled </strong> 
                    <div className="small"> You will receive document notifications. 
                        </div>
                         </div> 
                         </div> 
                         ); } 
        
                         return ( 
                         <div className="alert alert-warning d-flex align-items-center justify-content-between mb-3" role="alert" > 
                         <div className="d-flex align-items-center"> 
                            <span className="me-3" style={{ fontSize: "28px" }} > 🔔 
                                </span> 
                                <div> <strong> Browser Notifications </strong> 
                                <div className="small"> Enable notifications to receive document updates. 
                                    </div> 
                                    </div> 
                                    </div> 
                                    <button type="button" className="btn btn-primary" 
                                    onClick={enableNotifications} disabled={loading} > {loading ? "Enabling..." : "Enable Notifications"} 
                                    </button> </div> 
                                    );  
}

export default EnablePushNotifications