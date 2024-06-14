from rest_framework import serializers

class ListQuerySerializer(serializers.Serializer):
    """
    This is a global serializer
    used for lists
    """
    page = serializers.IntegerField(min_value=1, required=True)
    search = serializers.CharField(max_length=100, required=False, allow_blank=True)