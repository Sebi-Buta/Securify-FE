// Export all API hooks
export {
	useGetStatus,
	useGetComments,
	useGetUsers,
	useLoginVulnerable,
	useLoginSecure,
	useCreateComment,
	useCreateUser,
	useDeleteUser,
	useDeleteComment,
	type User,
	type LoginResponse,
	type Comment,
	type StatusResponse,
	type CreateUserRequest,
	type CreateUserResponse,
	type LoginRequest,
	type CreateCommentRequest,
	type DeleteResponse,
} from "./useApi";

// Export authentication hook
export { useAuth, type AuthState } from "./useAuth";

// Re-export existing hooks
export { useToast } from "./use-toast";
export { useIsMobile } from "./use-mobile";
