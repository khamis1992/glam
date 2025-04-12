import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  TextInput,
  Alert
} from 'react-native';
import { DollarSign, Clock, Edit2, Trash2, Plus, Save } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { useProfessionalStore } from '@/store/professional-store';
import { Service } from '@/types';

export default function ServicesScreen() {
  const { professional, updateServices } = useProfessionalStore();
  const [services, setServices] = useState<Service[]>(professional?.services || []);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  
  const [newService, setNewService] = useState<Partial<Service>>({
    name: '',
    description: '',
    price: 0,
    duration: '',
    categoryId: 'cat1' // Default category
  });
  
  const handleEditService = (service: Service) => {
    setEditingService(service);
    setIsAddingNew(false);
  };
  
  const handleDeleteService = (serviceId: string) => {
    Alert.alert(
      "Delete Service",
      "Are you sure you want to delete this service?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Delete", 
          onPress: () => {
            const updatedServices = services.filter(s => s.id !== serviceId);
            setServices(updatedServices);
            // In a real app, you would update the backend here
            updateServices(updatedServices);
          },
          style: "destructive"
        }
      ]
    );
  };
  
  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingService(null);
    setNewService({
      name: '',
      description: '',
      price: 0,
      duration: '',
      categoryId: 'cat1'
    });
  };
  
  const handleSaveService = () => {
    if (editingService) {
      // Update existing service
      const updatedServices = services.map(s => 
        s.id === editingService.id ? { ...s, ...editingService } : s
      );
      setServices(updatedServices);
      setEditingService(null);
      // In a real app, you would update the backend here
      updateServices(updatedServices);
    } else if (isAddingNew) {
      // Add new service
      if (!newService.name || !newService.description || !newService.price || !newService.duration) {
        Alert.alert("Error", "Please fill in all fields");
        return;
      }
      
      const newServiceWithId: Service = {
        id: `serv${Date.now()}`,
        name: newService.name || '',
        description: newService.description || '',
        price: newService.price || 0,
        duration: newService.duration || '',
        categoryId: newService.categoryId || 'cat1'
      };
      
      const updatedServices = [...services, newServiceWithId];
      setServices(updatedServices);
      setIsAddingNew(false);
      // In a real app, you would update the backend here
      updateServices(updatedServices);
    }
  };
  
  const handleCancelEdit = () => {
    setEditingService(null);
    setIsAddingNew(false);
  };
  
  const renderEditForm = () => {
    const service = editingService || newService;
    
    return (
      <Card style={styles.editCard}>
        <Text style={styles.editTitle}>
          {editingService ? 'Edit Service' : 'Add New Service'}
        </Text>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Service Name</Text>
          <TextInput
            style={styles.input}
            value={service.name}
            onChangeText={(text) => 
              editingService 
                ? setEditingService({ ...editingService, name: text })
                : setNewService({ ...newService, name: text })
            }
            placeholder="e.g. Bridal Makeup"
          />
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={service.description}
            onChangeText={(text) => 
              editingService 
                ? setEditingService({ ...editingService, description: text })
                : setNewService({ ...newService, description: text })
            }
            placeholder="Describe your service..."
            multiline
            numberOfLines={3}
          />
        </View>
        
        <View style={styles.formRow}>
          <View style={[styles.formGroup, { flex: 1, marginRight: Layout.spacing.m }]}>
            <Text style={styles.label}>Price ($)</Text>
            <TextInput
              style={styles.input}
              value={service.price?.toString()}
              onChangeText={(text) => {
                const price = parseFloat(text) || 0;
                editingService 
                  ? setEditingService({ ...editingService, price })
                  : setNewService({ ...newService, price });
              }}
              keyboardType="numeric"
              placeholder="0.00"
            />
          </View>
          
          <View style={[styles.formGroup, { flex: 1 }]}>
            <Text style={styles.label}>Duration</Text>
            <TextInput
              style={styles.input}
              value={service.duration}
              onChangeText={(text) => 
                editingService 
                  ? setEditingService({ ...editingService, duration: text })
                  : setNewService({ ...newService, duration: text })
              }
              placeholder="e.g. 1 hour"
            />
          </View>
        </View>
        
        <View style={styles.formActions}>
          <Button
            title="Cancel"
            variant="outline"
            size="medium"
            onPress={handleCancelEdit}
            style={{ marginRight: Layout.spacing.m }}
          />
          <Button
            title="Save"
            variant="primary"
            size="medium"
            onPress={handleSaveService}
            icon={<Save size={16} color="#fff" />}
            iconPosition="left"
          />
        </View>
      </Card>
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Your Services</Text>
          <Button
            title="Add New"
            variant="primary"
            size="small"
            onPress={handleAddNew}
            icon={<Plus size={16} color="#fff" />}
            iconPosition="left"
          />
        </View>
        
        {(editingService || isAddingNew) && renderEditForm()}
        
        {services.length === 0 && !isAddingNew ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>No services yet</Text>
            <Text style={styles.emptyStateText}>
              Add your first service to start receiving bookings.
            </Text>
            <Button
              title="Add Your First Service"
              variant="primary"
              size="medium"
              onPress={handleAddNew}
              icon={<Plus size={16} color="#fff" />}
              iconPosition="left"
              style={styles.emptyStateButton}
            />
          </View>
        ) : (
          services.map((service) => (
            <Card key={service.id} style={styles.serviceCard}>
              <View style={styles.serviceHeader}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <View style={styles.serviceActions}>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => handleEditService(service)}
                  >
                    <Edit2 size={16} color={Colors.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => handleDeleteService(service.id)}
                  >
                    <Trash2 size={16} color={Colors.error} />
                  </TouchableOpacity>
                </View>
              </View>
              
              <Text style={styles.serviceDescription}>{service.description}</Text>
              
              <View style={styles.serviceDetails}>
                <View style={styles.detailItem}>
                  <DollarSign size={16} color={Colors.primary} />
                  <Text style={styles.detailText}>${service.price}</Text>
                </View>
                
                <View style={styles.detailItem}>
                  <Clock size={16} color={Colors.primary} />
                  <Text style={styles.detailText}>{service.duration}</Text>
                </View>
              </View>
            </Card>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: Layout.spacing.l,
    paddingBottom: Layout.spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: Layout.spacing.l,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
  },
  serviceCard: {
    marginBottom: Layout.spacing.m,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.s,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  serviceActions: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.surfaceVariant,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Layout.spacing.s,
  },
  serviceDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: Layout.spacing.m,
    lineHeight: 20,
  },
  serviceDetails: {
    flexDirection: 'row',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${Colors.primary}15`,
    paddingHorizontal: Layout.spacing.s,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.small,
    marginRight: Layout.spacing.m,
  },
  detailText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
    marginLeft: Layout.spacing.xs,
  },
  editCard: {
    marginBottom: Layout.spacing.l,
  },
  editTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Layout.spacing.m,
  },
  formGroup: {
    marginBottom: Layout.spacing.m,
  },
  formRow: {
    flexDirection: 'row',
    marginBottom: Layout.spacing.m,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: Layout.spacing.xs,
  },
  input: {
    backgroundColor: Colors.surfaceVariant,
    borderRadius: Layout.borderRadius.small,
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: Layout.spacing.s,
    fontSize: 14,
    color: Colors.text,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Layout.spacing.xl * 2,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Layout.spacing.s,
  },
  emptyStateText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Layout.spacing.l,
  },
  emptyStateButton: {
    marginTop: Layout.spacing.m,
  },
});