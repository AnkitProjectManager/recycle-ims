-- Inventory Management Tables

-- Material Categories
CREATE TABLE IF NOT EXISTS material_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tenant_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    parent_id INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES material_categories(id) ON DELETE SET NULL
);

-- Materials (Inventory Items)
CREATE TABLE IF NOT EXISTS materials (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tenant_id INT NOT NULL,
    category_id INT,
    sku VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    unit_of_measure ENUM('lbs', 'tons', 'kg', 'pieces', 'yards') DEFAULT 'lbs',
    current_quantity DECIMAL(15, 4) DEFAULT 0,
    reorder_point DECIMAL(15, 4),
    standard_cost DECIMAL(15, 4),
    average_cost DECIMAL(15, 4),
    gl_code VARCHAR(50),
    barcode VARCHAR(100),
    status ENUM('active', 'inactive', 'discontinued') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES material_categories(id) ON DELETE SET NULL,
    UNIQUE KEY unique_sku_per_tenant (tenant_id, sku)
);

-- Storage Locations
CREATE TABLE IF NOT EXISTS locations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tenant_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    type ENUM('warehouse', 'yard', 'bin', 'truck') DEFAULT 'warehouse',
    parent_id INT NULL,
    capacity DECIMAL(15, 4),
    current_usage DECIMAL(15, 4) DEFAULT 0,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES locations(id) ON DELETE SET NULL
);

-- Inventory Transactions
CREATE TABLE IF NOT EXISTS inventory_transactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tenant_id INT NOT NULL,
    material_id INT NOT NULL,
    location_id INT,
    transaction_type ENUM('receipt', 'shipment', 'adjustment', 'transfer', 'production') NOT NULL,
    quantity DECIMAL(15, 4) NOT NULL,
    unit_cost DECIMAL(15, 4),
    reference_type VARCHAR(50),
    reference_id INT,
    notes TEXT,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
    FOREIGN KEY (material_id) REFERENCES materials(id) ON DELETE CASCADE,
    FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Inventory Snapshots (for historical tracking)
CREATE TABLE IF NOT EXISTS inventory_snapshots (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tenant_id INT NOT NULL,
    material_id INT NOT NULL,
    location_id INT,
    quantity DECIMAL(15, 4) NOT NULL,
    value DECIMAL(15, 2),
    snapshot_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
    FOREIGN KEY (material_id) REFERENCES materials(id) ON DELETE CASCADE,
    FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE SET NULL,
    UNIQUE KEY unique_snapshot (tenant_id, material_id, location_id, snapshot_date)
);
