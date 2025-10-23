-- Compliance & Certification Tables

-- Destruction Certificates
CREATE TABLE IF NOT EXISTS destruction_certificates (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tenant_id INT NOT NULL,
    certificate_number VARCHAR(50) NOT NULL,
    customer_id INT NOT NULL,
    sales_order_id INT,
    certificate_date DATE NOT NULL,
    destruction_date DATE NOT NULL,
    destruction_method VARCHAR(255),
    total_weight DECIMAL(15, 4),
    unit_of_measure VARCHAR(20) DEFAULT 'lbs',
    status ENUM('draft', 'issued', 'sent', 'archived') DEFAULT 'draft',
    pdf_url VARCHAR(500),
    notes TEXT,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    FOREIGN KEY (sales_order_id) REFERENCES sales_orders(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    UNIQUE KEY unique_cert_number (tenant_id, certificate_number)
);

-- Destruction Certificate Items
CREATE TABLE IF NOT EXISTS destruction_certificate_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    certificate_id INT NOT NULL,
    material_id INT NOT NULL,
    description TEXT,
    quantity DECIMAL(15, 4) NOT NULL,
    unit_of_measure VARCHAR(20),
    serial_numbers TEXT,
    FOREIGN KEY (certificate_id) REFERENCES destruction_certificates(id) ON DELETE CASCADE,
    FOREIGN KEY (material_id) REFERENCES materials(id) ON DELETE CASCADE
);

-- Waste Diversion Tracking
CREATE TABLE IF NOT EXISTS waste_diversion_records (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tenant_id INT NOT NULL,
    customer_id INT,
    record_date DATE NOT NULL,
    material_type VARCHAR(100) NOT NULL,
    weight DECIMAL(15, 4) NOT NULL,
    unit_of_measure VARCHAR(20) DEFAULT 'lbs',
    diversion_method ENUM('recycled', 'reused', 'composted', 'energy_recovery', 'landfill') NOT NULL,
    diversion_rate DECIMAL(5, 2),
    co2_offset DECIMAL(15, 4),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL
);

-- Compliance Documents
CREATE TABLE IF NOT EXISTS compliance_documents (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tenant_id INT NOT NULL,
    document_type VARCHAR(100) NOT NULL,
    document_number VARCHAR(100),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    file_url VARCHAR(500),
    file_type VARCHAR(50),
    related_entity_type VARCHAR(50),
    related_entity_id INT,
    expiration_date DATE,
    status ENUM('active', 'expired', 'archived') DEFAULT 'active',
    uploaded_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
    FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL
);
