-- Seed Initial Data

-- Insert default tenant
INSERT INTO tenants (name, subdomain, status, settings) VALUES
('Connecticut Metal Industries', 'cmi', 'active', '{"timezone": "America/New_York", "currency": "USD"}');

-- Insert default permissions
INSERT INTO permissions (name, description, module) VALUES
('view_dashboard', 'View dashboard and KPIs', 'dashboard'),
('manage_inventory', 'Manage inventory and materials', 'inventory'),
('view_inventory', 'View inventory data', 'inventory'),
('manage_sales', 'Create and manage sales orders', 'sales'),
('view_sales', 'View sales data', 'sales'),
('manage_invoices', 'Create and manage invoices', 'sales'),
('view_invoices', 'View invoices', 'sales'),
('manage_purchases', 'Create and manage purchase orders', 'purchasing'),
('view_purchases', 'View purchase orders', 'purchasing'),
('manage_customers', 'Manage customer data', 'customers'),
('view_customers', 'View customer data', 'customers'),
('manage_vendors', 'Manage vendor data', 'vendors'),
('view_vendors', 'View vendor data', 'vendors'),
('manage_compliance', 'Manage compliance documents and certificates', 'compliance'),
('view_compliance', 'View compliance documents', 'compliance'),
('manage_users', 'Manage user accounts', 'admin'),
('view_reports', 'View reports and analytics', 'reports'),
('manage_settings', 'Manage system settings', 'admin');

-- Assign permissions to roles
INSERT INTO role_permissions (role, permission_id) 
SELECT 'admin', id FROM permissions;

INSERT INTO role_permissions (role, permission_id) 
SELECT 'manager', id FROM permissions WHERE name IN (
    'view_dashboard', 'manage_inventory', 'view_inventory', 'manage_sales', 'view_sales',
    'manage_invoices', 'view_invoices', 'manage_purchases', 'view_purchases',
    'manage_customers', 'view_customers', 'manage_vendors', 'view_vendors',
    'manage_compliance', 'view_compliance', 'view_reports'
);

INSERT INTO role_permissions (role, permission_id) 
SELECT 'trader', id FROM permissions WHERE name IN (
    'view_dashboard', 'manage_sales', 'view_sales', 'view_invoices',
    'manage_purchases', 'view_purchases', 'view_customers', 'view_vendors', 'view_inventory'
);

INSERT INTO role_permissions (role, permission_id) 
SELECT 'operator', id FROM permissions WHERE name IN (
    'view_inventory', 'view_sales', 'view_purchases'
);

INSERT INTO role_permissions (role, permission_id) 
SELECT 'customer', id FROM permissions WHERE name IN (
    'view_compliance', 'view_invoices'
);

-- Insert sample material categories
INSERT INTO material_categories (tenant_id, name, description) VALUES
(1, 'Ferrous Metals', 'Iron and steel-based materials'),
(1, 'Non-Ferrous Metals', 'Aluminum, copper, brass, etc.'),
(1, 'Electronics', 'Electronic waste and components'),
(1, 'Paper & Cardboard', 'Recyclable paper products'),
(1, 'Plastics', 'Various plastic materials');

-- Insert sample GL codes
INSERT INTO gl_codes (tenant_id, code, name, account_type, is_active) VALUES
(1, '1000', 'Cash', 'asset', TRUE),
(1, '1200', 'Accounts Receivable', 'asset', TRUE),
(1, '1300', 'Inventory', 'asset', TRUE),
(1, '2000', 'Accounts Payable', 'liability', TRUE),
(1, '3000', 'Owner Equity', 'equity', TRUE),
(1, '4000', 'Sales Revenue', 'revenue', TRUE),
(1, '5000', 'Cost of Goods Sold', 'cogs', TRUE),
(1, '6000', 'Operating Expenses', 'expense', TRUE);

-- Insert sample location
INSERT INTO locations (tenant_id, name, type, capacity, status) VALUES
(1, 'Main Warehouse', 'warehouse', 100000, 'active'),
(1, 'Yard A', 'yard', 50000, 'active'),
(1, 'Yard B', 'yard', 50000, 'active');
