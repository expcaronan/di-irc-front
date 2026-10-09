import { taskDocumentAssignedDepartmentBaseModel } from "../Interfaces/BaseModel/taskDocumentAssignedDepartmentBaseModel";

const getTestNotifications = async (accessToken: string, departmentId:number,differenceData: taskDocumentAssignedDepartmentBaseModel[]) => {
try {
const Token = accessToken
    ? JSON.parse(accessToken).replace(/^"|"$/g, "")
    : null;

    if (!Token || typeof Token !== "string") {
        alert("JWT token not found in stored login data.");
        return;
    }

    // Use the employee ID belonging to the subscribed employee.
    //const employeeId = 8;

    const response = await fetch(
        `https://localhost:44341/api/PushSubscription/test/${departmentId}`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${Token}`,
                "Content-Type": "application/json"
            },
           body: JSON.stringify(differenceData)
        }
    );

    const responseText = await response.text();

    if (!response.ok) {
        throw new Error(
            `HTTP ${response.status}: ${responseText}`
        );
    }

    const result = responseText
        ? JSON.parse(responseText)
        : {};

    console.log("Push notification test result:", result);



    // alert(
    //     `API response: ${result.message ?? "Request completed"}\n` +
    //     `Employee ID: ${result.employeeId ?? employeeId}\n` +
    //     `Notifications sent: ${result.sent ?? 0}`
    // );
} catch (error) {
    console.error("Test push notification failed:", error);

    alert(
        error instanceof Error
            ? error.message
            : "Failed to test push notification."
    );
}


};

export default getTestNotifications;