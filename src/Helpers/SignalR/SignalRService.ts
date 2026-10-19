import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

class SignalRService {
  private hubConnection: HubConnection | null = null;
  private receiveMessageCallback: ((message: string) => void) | null = null;
  private receiveCountMessageCallback: ((message: string) => void) | null = null;
  private receiveUpdateMessageCallback: ((message: string) => void) | null = null;
  private totalUsersCallback: ((message: any) => void) | null = null;
  private onConnectedMessageCallback: ((userId: string, myUserName: string) => void) | null = null;

  startConnection = async (token:any) => {
    try {
     
      this.hubConnection = new HubConnectionBuilder()
        
          .withUrl('https://localhost:44341/hubs/sentMessage',{
        //.withUrl('http://204.64.166.10:8080/irc_di_api/hubs/sentMessage',{
          accessTokenFactory: () => token,
         })
        .configureLogging(LogLevel.Debug)
        .withAutomaticReconnect()
        .build();

      this.hubConnection.on('SendMessageToClients', (message: any) => {
        //console.log(message);
        this.handleReceivedMessage(message);
      });
        this.hubConnection.on('SendMessageToClientsCount', (message: any) => {
        //console.log(message);
        this.handleReceivedMessageCount(message);
      });

       this.hubConnection.on('SendMessageToClientsUpdate', (message: any) => {
        //console.log(message);
        this.handleReceivedMessageUpdate(message);
      });




      this.hubConnection.on('Message', (message: any) => {
        this.handleTotalUsers(message);
      });

      this.hubConnection.on("ReceiveUserConnected",  (userId:string, myUserName:string)=>{
       this.handleOnConnectedMessage(userId, myUserName)
      });

      

      // await this.hubConnection.invoke("Login",(message:any, id:any) =>{
      //   this.handleLoginUsers(message, id);
      // })
     
      await this.hubConnection.start();
     
     
      console.log("SignalR connection started");

     


    } catch (error) {
      console.error("Error starting SignalR connection:", error);
    }
  };

  stopConnection = async () => {
    if (this.hubConnection) {
      await this.hubConnection.stop();
      console.log('SignalR connection stopped');
    }
  };

  sendMessageToServer = async (message: string) => {
    try {
      if (this.hubConnection) {
        // Invoke the SendMessage method on the server
        await this.hubConnection.invoke('SendMessage', message);
        console.log(`Sent message to the server: ${message}`);
      } else {
        console.error('SignalR connection is not established.');
      }
    } catch (error) {
      console.error('Error sending message to the server:', error);
    }
  };

   private handleReceivedMessage = (message: string) => {
    //console.log(`Received message: ${message}`);
    if (this.receiveMessageCallback) {
      this.receiveMessageCallback(message);
    }
  };
   private handleReceivedMessageCount = (message: string) => {
    //console.log(`Received message: ${message}`);
    if (this.receiveCountMessageCallback) {
      this.receiveCountMessageCallback(message);
    }
  };
  private handleReceivedMessageUpdate = (message: string) => {
    //console.log(`Received message: ${message}`);
    if (this.receiveUpdateMessageCallback) {
      this.receiveUpdateMessageCallback(message);
    }
  };

  onReceiveMessage = (callback: (message: string) => void) => {
    this.receiveMessageCallback = callback;
  };

  onReceiveMessageCount = (callback: (message: string) => void) => {
    this.receiveCountMessageCallback = callback;
  };

   onReceiveMessageUpdate = (callback: (message: string) => void) => {
    this.receiveUpdateMessageCallback = callback;
  };

  
  private handleOnConnectedMessage = (userId:string, message: string) => {
    //console.log(`Received message: ${message}`);
    if (this.onConnectedMessageCallback) {
      this.onConnectedMessageCallback(userId, message);
    }
  };

  onConnectedMessage = (callback: (userId:string, message: string) => void) => {
    this.onConnectedMessageCallback = callback;
  };

  private handleTotalUsers = (message: any) => {
    if (this.totalUsersCallback) {
      this.totalUsersCallback(message);
    }
  };

  onTotalUsers = (callback: (message: any) => void) => {
    this.totalUsersCallback = callback;
  };

  
  

  // Add other methods as needed

}

const signalRService = new SignalRService();
export default signalRService;
