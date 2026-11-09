export default interface leaveApplicationApprovalModel {
    id: number;
    leaveApplicationId: number;
    statusId: number;
    employeeId_Approver: number;
    comments: string;
    approvalDate: string; 
}