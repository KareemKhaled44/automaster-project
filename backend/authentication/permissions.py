from rest_framework.permissions import BasePermission


####################
# will use this in trainer management view permission like this
###################
# from accounts.permissions import IsAcademy

# class TrainerCreateView(APIView):
#     permission_classes = [IsAcademy]

#     def post(self, request):
#         # request.user.academy_profile gives you the academy
#         academy = request.user.academy_profile
#         # ... create trainer linked to this academy
###################

class IsAcademy(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'academy'

class IsRegularUser(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'user'